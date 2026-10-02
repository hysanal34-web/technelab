'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import type { SahneProgram } from './sahneVeri'

/**
 * Sahne: ghost light.
 *
 * Salon boşaldıktan sonra sahnede yanık bırakılan tek çıplak ampul. Karanlık,
 * eski tahta zemin, kafesli ampul, havada toz. Programlar zemine yapıştırılmış
 * neon spike bantları: numara + ad. Bandın üstüne gelince ampul hafifçe
 * güçlenir, liste satırı yanar (onHover); tıklayınca kamera banda iner (focused).
 *
 * Açılış disiplini (ilk saniyedeki takılmanın sebebi buydu):
 * - Kurulum tek blokta değil, parça parça; her ağır adım arasında tarayıcıya
 *   kare bırakılır (yieldFrame). Sayfa bu sırada kaymaya, tıklamaya cevap verir.
 * - Zemin dokusu piksel tamponuyla üretilir (20 bin fillRect yerine tek döngü).
 * - Gölge haritası bir kez çizilir (sahne durağan; ampul ve zemin kıpırdamaz).
 *   PointLight gölgesi küp harita = her kare 6 ek çizimdi; artık sıfır.
 * - Shader derlemesi küçücük bir tuvalde yapılır (derleme boyuta bağlı değil,
 *   bloom'un doldurma maliyeti bağlı). Sonra tam boya geçilir ve kare süresi
 *   iki kez art arda 34 ms altına inene kadar 3D görünmez kalır (SVG önde).
 * - Kamera, kadraja (dikey/yatay) göre açılış konumunda başlar; ilk görünür
 *   karede yanlış yerden süzülmez.
 * - Salon karanlık başlar; durağan SVG de karanlık (ampul sönük). Geçişte göze
 *   çarpan "başka bir kare" yoktur. Ampul 3D'nin içinde, yazılmış kısa bir çift
 *   göz kırpmasıyla yanar (rastgele strob değil).
 *
 * Telefonda daha hafif ayarlar (düşük DPR, küçük gölge, az toz) ve dikey
 * kadraj: bantlar tek sütun, kamera dik. Dokunmatikte hover yok, dokunulan
 * noktadan ışın atılır. Tekerlek dinlenmez. Dokular kod ile üretilir.
 */
export type Sahne3DProps = {
  programs: SahneProgram[]
  hover: number
  focused: number
  onHover: (i: number) => void
  onSelect: (i: number) => void
  onUnfocus: () => void
  onReady: () => void
}

const NEON = 0xc8ff00
const BG = 0x0a0a0c
const WARM = 0xffd9a0
const BULB_Y = 1.86
const FONT = 'Anton, Impact, "Arial Narrow", sans-serif'

type Draw = (x: CanvasRenderingContext2D, w: number, h: number) => void
function canvasTex(w: number, h: number, draw: Draw): THREE.CanvasTexture {
  const cv = document.createElement('canvas')
  cv.width = w; cv.height = h
  draw(cv.getContext('2d')!, w, h)
  const t = new THREE.CanvasTexture(cv)
  t.encoding = THREE.sRGBEncoding
  return t
}

/** Tarayıcıya bir kare bırak: ana iş parçacığı boşalır, sayfa nefes alır. */
const yieldFrame = () => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 0)))

/** Tohumlu rastgele: her yüklemede aynı tahta, aynı toz. */
function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

/** Eski sahne tahtası: piksel tamponu, tek geçiş. 1024² için ~15 ms. */
function floorTexture(size: number): THREE.CanvasTexture {
  return canvasTex(size, size, (x, w, h) => {
    const img = x.createImageData(w, h), d = img.data
    const rnd = rng(1907)
    const board = Math.max(32, Math.round(size / 16))
    const rows = Math.ceil(h / board)
    const tint = Array.from({ length: rows }, () => (rnd() - 0.5) * 10)
    const seams = Array.from({ length: rows }, () => { const s: number[] = []; let bx = rnd() * 300; while (bx < w) { s.push(Math.floor(bx)); bx += 260 + rnd() * 380 } return s })
    for (let y = 0; y < h; y++) {
      const r = Math.floor(y / board), inRow = y % board
      const base = 18 + tint[r]
      const seamRow = inRow >= board - 2
      const sm = seams[r]
      for (let xx = 0; xx < w; xx++) {
        let v = base + (rnd() - 0.5) * 9 // tahta dokusu: ince gürültü
        if (seamRow) v *= 0.4
        for (let k = 0; k < sm.length; k++) { const sx = sm[k]; if (xx === sx || xx === sx + 1) { v *= 0.55; break } }
        const o = (y * w + xx) * 4
        d[o] = v + 1; d[o + 1] = v; d[o + 2] = v - 1; d[o + 3] = 255
      }
    }
    x.putImageData(img, 0, 0)
    // uzun lif çizgileri: az sayıda, hafif
    const n = size >= 1024 ? 500 : 160
    for (let i = 0; i < n; i++) {
      x.strokeStyle = `rgba(255,240,220,${rnd() * 0.05})`; x.lineWidth = rnd() * 1.4
      x.beginPath(); const sx = rnd() * w, sy = rnd() * h
      x.moveTo(sx, sy); x.lineTo(sx + (rnd() - 0.5) * 120, sy + (rnd() - 0.5) * 14); x.stroke()
    }
  })
}

type Mark = { mat: THREE.MeshStandardMaterial; level: number; pos: THREE.Vector3 }

export default function Sahne3D(props: Sahne3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const propsRef = useRef(props)
  propsRef.current = props

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const host = canvas.parentElement as HTMLElement
    let disposed = false
    let raf = 0
    const cleanups: Array<() => void> = []
    const on = (el: HTMLElement | Window | Document, k: string, f: (e: any) => void) => {
      el.addEventListener(k, f); cleanups.push(() => el.removeEventListener(k, f))
    }

    // Destek: açılış zaman çizelgesi (ms, sayfa başından). Konsolda window.__sahneZaman.
    const Z: Record<string, number> = ((window as unknown as { __sahneZaman?: Record<string, number> }).__sahneZaman = {})
    const zaman = (k: string) => { Z[k] = Math.round(performance.now()) }
    zaman('baglandi')
    ;(async () => {
      try { await Promise.race([document.fonts.load('400 100px Anton', 'TECHNE LAB'), new Promise((r) => setTimeout(r, 700))]) } catch { /* yoksay */ }
      if (disposed) return
      zaman('font')
      const P = propsRef.current.programs
      const N = P.length
      if (N === 0) return

      /* ── Renderer ─────────────────────────────────────────── */
      THREE.ColorManagement.legacyMode = false
      const touch = window.matchMedia('(hover: none)').matches
      const hafif = touch || (navigator.hardwareConcurrency ?? 8) <= 4 // telefon: daha düşük çözünürlük, küçük gölge haritası
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: !hafif, powerPreference: 'high-performance' })
      const DPR = Math.min(window.devicePixelRatio || 1, hafif ? 1.5 : 1.75)
      renderer.setPixelRatio(DPR)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.shadowMap.autoUpdate = false // sahne durağan: gölge bir kez
      cleanups.push(() => renderer.dispose())

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(BG)
      scene.fog = new THREE.FogExp2(BG, 0.09)
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80)
      await yieldFrame(); if (disposed) return

      /* ── Zemin: eski sahne tahtası ─────────────────────────── */
      const floorTex = floorTexture(hafif ? 512 : 1024)
      floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(4, 4); floorTex.anisotropy = 8
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.62, metalness: 0.05 }))
      floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor)
      await yieldFrame(); if (disposed) return

      /* ── Ghost light ───────────────────────────────────────── */
      const metal = new THREE.MeshStandardMaterial({ color: 0x2b2b2e, roughness: 0.35, metalness: 0.9 })
      const gl = new THREE.Group(); scene.add(gl)
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.07, 48), metal); base.position.y = 0.035; base.castShadow = base.receiveShadow = true; gl.add(base)
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 1.62, 16), metal); pole.position.y = 0.88; pole.castShadow = true; gl.add(pole)
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.1, 20), metal); collar.position.y = 1.72; gl.add(collar)
      const cage = new THREE.Group(); cage.position.y = BULB_Y
      const wire = new THREE.MeshStandardMaterial({ color: 0x1d1d20, roughness: 0.4, metalness: 0.9 })
      for (let k = 0; k < 8; k++) { const t = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.0045, 6, 48, Math.PI), wire); t.rotation.set(0, (k * Math.PI) / 8, -Math.PI / 2); t.castShadow = true; cage.add(t) }
      ;[-0.07, 0, 0.07].forEach((y) => { const r = Math.sqrt(0.14 * 0.14 - y * y); const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.0045, 6, 48), wire); t.rotation.x = Math.PI / 2; t.position.y = y; t.castShadow = true; cage.add(t) })
      gl.add(cage)
      const bulbMat = new THREE.MeshStandardMaterial({ color: 0xfff3df, emissive: WARM, emissiveIntensity: 2.2, roughness: 0.2, transparent: true, opacity: 0.92 })
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.075, 32, 24), bulbMat); bulb.position.y = BULB_Y; gl.add(bulb)
      const filMat = new THREE.MeshBasicMaterial({ color: NEON })
      const fil = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.0035, 8, 32), filMat); fil.position.y = BULB_Y; gl.add(fil)
      const lamp = new THREE.PointLight(WARM, 0, 9, 2); lamp.position.y = BULB_Y + 0.001; lamp.castShadow = true
      lamp.shadow.mapSize.set(hafif ? 1024 : 2048, hafif ? 1024 : 2048); lamp.shadow.bias = -0.0005; lamp.shadow.radius = 3; gl.add(lamp)
      scene.add(new THREE.HemisphereLight(0x8a8a90, 0x000000, 0.02))
      const haloTex = canvasTex(256, 256, (x, w, h) => {
        const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2)
        g.addColorStop(0, 'rgba(255,230,190,.9)'); g.addColorStop(0.25, 'rgba(255,220,170,.25)'); g.addColorStop(1, 'rgba(255,220,170,0)')
        x.fillStyle = g; x.fillRect(0, 0, w, h)
      })
      const haloMat = new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 })
      const halo = new THREE.Sprite(haloMat); halo.scale.set(1.6, 1.6, 1); halo.position.y = BULB_Y; gl.add(halo)
      await yieldFrame(); if (disposed) return

      /* ── Spike bantları (programlar) ───────────────────────── */
      const R = 2.55
      const marks: Mark[] = []
      const hits: THREE.Mesh[] = []
      const markTexture = (i: number, p: SahneProgram) => canvasTex(1024, 256, (x, W, H) => {
        x.clearRect(0, 0, W, H)
        x.fillStyle = '#C8FF00'
        x.save(); x.translate(56, 128); x.rotate(((i * 37) % 7 - 3) * 0.01)
        x.fillRect(-40, -9, 80, 18); x.fillRect(-9, -9, 18, 70); x.restore()
        x.fillStyle = '#0A0A0C'; x.font = `400 22px ${FONT}`; x.textAlign = 'center'; x.fillText(String(i + 1).padStart(2, '0'), 56, 138)
        x.textAlign = 'left'; x.fillStyle = '#EDEDE6'
        let size = 78; x.font = `400 ${size}px ${FONT}`
        const title = p.title.toUpperCase()
        while (x.measureText(title).width > W - 140 && size > 40) { size -= 4; x.font = `400 ${size}px ${FONT}` }
        x.fillText(title, 124, 150)
        x.fillStyle = 'rgba(237,237,230,.55)'; x.font = '700 26px "Courier New", monospace'
        x.fillText(p.facts.slice(0, 3).join(' · ').toLocaleUpperCase('tr-TR'), 128, 196)
      })
      const meshes: THREE.Mesh[] = []
      for (let i = 0; i < N; i++) {
        const p = P[i]
        const map = markTexture(i, p); map.anisotropy = 8
        const mat = new THREE.MeshStandardMaterial({ map, emissiveMap: map, emissive: 0xffffff, emissiveIntensity: 0, transparent: true, roughness: 0.7, depthWrite: false, opacity: 0 })
        const m = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.55), mat)
        m.rotation.x = -Math.PI / 2; m.receiveShadow = true; scene.add(m); meshes.push(m)
        const hit = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 0.7), new THREE.MeshBasicMaterial({ visible: false }))
        hit.userData.i = i; scene.add(hit); hits.push(hit)
        marks.push({ mat, level: 0, pos: new THREE.Vector3() })
        if (i % 3 === 2) { await yieldFrame(); if (disposed) return }
      }
      /**
       * Bant yerleşimi kadraja göre:
       * yatay → iki sıra şaşırtmalı yay, ampulün önünde sağa-sola yayılır;
       * dikey (telefon) → ampulün önünde tek sütun, kameraya doğru sıralanır,
       * bantlar biraz daralır ki ekrana sığsın.
       */
      const placeMarks = (portrait: boolean, aspect: number) => {
        const sp = THREE.MathUtils.clamp((aspect - 0.6) / 1.4, 0.5, 1) // dar masaüstünde yay daralır, kenardan taşmaz
        P.forEach((_, i) => {
          let x: number, z: number, rz: number, sx: number
          if (portrait) {
            x = (i % 2 ? 0.14 : -0.14); z = 0.9 + i * 0.46; rz = (i % 2 ? -1 : 1) * 0.03; sx = 0.7
          } else {
            const u = N === 1 ? 0.5 : i / (N - 1)
            const a = Math.PI * (0.18 + 0.64 * u)
            const rr = i % 2 ? R * 1.5 : R * 0.95
            const ax = Math.cos(a) * rr * -1.15
            x = ax * sp - 0.7 * sp; z = Math.sin(a) * rr * 0.62 + 0.15; rz = Math.atan2(-ax, 6) * 0.35; sx = 1
          }
          meshes[i].position.set(x, 0.006, z); meshes[i].rotation.z = rz; meshes[i].scale.set(sx, sx, 1)
          hits[i].position.set(x, 0.2, z); hits[i].scale.set(sx, 1, sx)
          marks[i].pos.set(x, 0, z)
        })
      }

      /* ── Toz ───────────────────────────────────────────────── */
      const DN = hafif ? 220 : 380, dp = new Float32Array(DN * 3), ds = new Float32Array(DN)
      const drnd = rng(42)
      for (let i = 0; i < DN; i++) { const r = drnd() * 1.3, a = drnd() * 6.28; dp[i * 3] = Math.cos(a) * r; dp[i * 3 + 1] = drnd() * 3; dp[i * 3 + 2] = Math.sin(a) * r; ds[i] = drnd() * 100 }
      const dG = new THREE.BufferGeometry(); dG.setAttribute('position', new THREE.BufferAttribute(dp, 3))
      const dustMat = new THREE.PointsMaterial({ color: 0xffe6c4, size: 0.014, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
      scene.add(new THREE.Points(dG, dustMat))

      /* ── Post: bloom + film ────────────────────────────────── */
      const W0 = host.clientWidth || 1200, H0 = host.clientHeight || 700
      const composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      const bloom = new UnrealBloomPass(new THREE.Vector2(W0, H0), 0.8, 0.5, 0.86)
      composer.addPass(bloom)
      const film = new ShaderPass({
        uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) } },
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; uniform vec2 uRes; varying vec2 vUv;
          vec3 aces(vec3 x){ const float a=2.51,b=.03,c=2.43,d=.59,e=.14; return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.,1.); }
          float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
          void main(){ vec2 c = vUv - .5; vec3 col = texture2D(tDiffuse, vUv).rgb; col = aces(col * 1.2); col = pow(col, vec3(1./2.2));
            col *= mix(.25, 1., smoothstep(.9, .2, length(c*vec2(1.2,1.)))); col += (h(vUv*uRes + fract(uTime)*97.) - .5) * .05; gl_FragColor = vec4(col, 1.); }`,
      })
      film.renderToScreen = true; composer.addPass(film)
      await yieldFrame(); if (disposed) return

      /* ── Kamera / girdi ────────────────────────────────────── */
      const look = new THREE.Vector3(0.35, 0.95, 0.4)
      const lookP = new THREE.Vector3(0, 0.5, 2.35) // dikey: sütunun ortasına bak
      let mx = 0, my = 0, tmx = 0, tmy = 0
      let portrait = false
      const pointer = new THREE.Vector2(9, 9)
      const camGoal = { pos: new THREE.Vector3(), look: look.clone() }
      const camNow = { pos: new THREE.Vector3(), look: look.clone() }
      const ray = new THREE.Raycaster()
      const tmpV = new THREE.Vector3()
      let hover3d = -1

      const toNdc = (cx: number, cy: number) => {
        const r = host.getBoundingClientRect()
        return [((cx - r.left) / r.width - 0.5) * 2, ((cy - r.top) / r.height - 0.5) * 2]
      }
      on(window, 'pointermove', (e: PointerEvent) => {
        if (touch) return
        ;[tmx, tmy] = toNdc(e.clientX, e.clientY)
        pointer.set(tmx, -tmy)
      })
      const pick = (nx: number, ny: number) => {
        ray.setFromCamera(new THREE.Vector2(nx, -ny), camera)
        const hs = ray.intersectObjects(hits)
        return hs.length ? (hs[0].object.userData.i as number) : -1
      }
      on(canvas, 'click', (e: MouseEvent) => {
        const pr = propsRef.current
        // dokunmatikte hover yok: dokunulan noktadan ışın at
        const [nx, ny] = toNdc(e.clientX, e.clientY)
        const i = touch ? pick(nx, ny) : hover3d
        if (i >= 0) pr.onSelect(i)
        else if (pr.focused >= 0) pr.onUnfocus()
      })

      /** Açılış kamera hedefi (intro = 0 ... 1). Kadraja göre. */
      const introGoal = (intro: number) => {
        if (portrait) { camGoal.pos.set(mx * 0.5, 6.3 + (1 - intro) * 1.4, 6.2 + (1 - intro) * 2.2); camGoal.look.copy(lookP) }
        else { camGoal.pos.set(1.2 + mx * 0.9, 3.2 - my * 0.35 + (1 - intro) * 1.2, 9.2 + (1 - intro) * 3.5); camGoal.look.copy(look) }
      }
      const applySize = (w: number, h: number) => {
        renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h)
        film.uniforms.uRes.value.set(w, h)
        const p = w / h < 0.9
        camera.aspect = w / h; camera.fov = p ? 64 : w / h < 1.3 ? 42 : 34; camera.updateProjectionMatrix()
        portrait = p; placeMarks(p, w / h)
      }
      const resize = () => { const w = host.clientWidth, h = host.clientHeight; if (w && h) applySize(w, h) }

      let visible = true, pageVisible = !document.hidden
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.05 }); io.observe(host); cleanups.push(() => io.disconnect())
      on(document, 'visibilitychange', () => { pageVisible = !document.hidden })

      zaman('kurulum')
      /* ── Isınma: shader derlemesi görünmez ve küçük tuvalde ─── */
      // Kadraj belli olsun, kamera açılış konumunda dursun.
      const fullW = host.clientWidth || W0, fullH = host.clientHeight || H0
      const p0 = fullW / fullH < 0.9
      portrait = p0
      introGoal(0); camNow.pos.copy(camGoal.pos); camNow.look.copy(camGoal.look)
      camera.position.copy(camNow.pos); camera.lookAt(camNow.look)
      renderer.shadowMap.needsUpdate = true
      // Küçük tuvalde iki kare: bütün programlar (gölge derinliği, bloom mipleri, film) derlenir.
      applySize(64, Math.max(24, Math.round(64 * fullH / fullW)))
      renderer.compile(scene, camera)
      await yieldFrame(); if (disposed) return
      composer.render()
      await yieldFrame(); if (disposed) return
      composer.render()
      await yieldFrame(); if (disposed) return
      // Tam boy; gölge bir kez daha (çözünürlük değişti).
      renderer.shadowMap.needsUpdate = true
      resize()
      zaman('derleme')
      const ro = new ResizeObserver(resize); ro.observe(host); cleanups.push(() => ro.disconnect())

      /* ── Döngü ─────────────────────────────────────────────── */
      const ease = (x: number) => { x = THREE.MathUtils.clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3) }
      const clock = new THREE.Clock()
      let start = -1, ready = false, warm = 0, smoothFrames = 0, lastFrameAt = performance.now()

      /**
       * Ampul ateşlemesi: salon karanlık başlar (durağan SVG de karanlık, geçiş
       * görünmez), 0.2 sn sonra yazılmış kısa çift göz kırpmasıyla yanar.
       * s = görünür olduktan sonraki saniye. Rastgele strob yok.
       */
      const ignition = (s: number) => {
        if (s < 0.2) return 0
        if (s < 0.27) return 0.45
        if (s < 0.4) return 0.08
        if (s < 0.47) return 0.6
        if (s < 0.56) return 0.25
        if (s < 0.9) return 0.25 + ((s - 0.56) / 0.34) * 0.75
        return 1
      }

      const frame = () => {
        if (disposed) return
        raf = requestAnimationFrame(frame)
        if (!visible || !pageVisible) return
        const now = performance.now()
        const frameMs = now - lastFrameAt; lastFrameAt = now
        const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime
        const pr = propsRef.current
        const focused = pr.focused
        // Isınma: tam boyda kare süresi istikrar bulana kadar (iki kez art arda
        // < 34 ms) ya da en çok 24 kare; SVG hâlâ önde, takılma seyirciye gitmez.
        if (!ready) {
          warm++
          introGoal(0); camNow.pos.copy(camGoal.pos); camNow.look.copy(camGoal.look)
          camera.position.copy(camNow.pos); camera.lookAt(camNow.look)
          // Isınma kareleri karanlık: ilk görünür kare de karanlık olacak.
          lamp.intensity = 0; bulbMat.emissiveIntensity = 0; haloMat.opacity = 0; filMat.color.setHex(NEON).multiplyScalar(0.4)
          composer.render()
          if (warm > 1 && frameMs < 34) smoothFrames++; else smoothFrames = 0
          if (smoothFrames < 2 && warm < 24) return
          ready = true; start = performance.now(); Z.isinmaKare = warm; zaman('hazir'); pr.onReady()
        }
        const s = Math.max(0, (performance.now() - start) / 1000)
        if (touch) { tmx = Math.sin(t * 0.17) * 0.35; tmy = 0 } // imleç yok: sahne kendi kendine hafifçe salınır
        mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05

        // ampul: yazılmış kısa ateşleme, sonra nefes alan sabit ışık
        const ign = ignition(s)
        const flick = ign * (0.94 + Math.sin(t * 2.1) * 0.025 + Math.sin(t * 17.3) * 0.012 + (s > 3 && Math.random() > 0.997 ? -0.3 : 0))
        tmpV.set(0, BULB_Y, 0).project(camera)
        const near = 1 - Math.min(1, Math.hypot(pointer.x - tmpV.x, (pointer.y - tmpV.y) * 0.8) / 1.1)

        let hv = -1
        if (focused < 0 && !touch) hv = pick(pointer.x, -pointer.y)
        if (hv !== hover3d) { hover3d = hv; canvas.style.cursor = hv >= 0 ? 'pointer' : ''; pr.onHover(hv) }
        const act = focused >= 0 ? focused : hover3d >= 0 ? hover3d : pr.hover

        const boost = 1 + near * 0.35 + (act >= 0 ? 0.25 : 0)
        lamp.intensity = flick * 2.6 * boost
        bulbMat.emissiveIntensity = 1.4 + flick * 2.2 * boost
        haloMat.opacity = flick * 0.55
        filMat.color.setHex(NEON).multiplyScalar(0.4 + flick * 0.8)
        dustMat.opacity = ease((s - 0.9) / 2) * 0.55

        const intro = ease(s / 5)
        if (focused >= 0 && marks[focused]) {
          const mp = marks[focused].pos
          if (portrait) { camGoal.pos.set(mp.x * 0.4, 2.7, mp.z + 2.3); camGoal.look.set(mp.x, 0.05, mp.z - 0.15) }
          else { camGoal.pos.set(mp.x * 0.8 + 0.6, 2.2, mp.z + 3.4); camGoal.look.set(mp.x + 0.3, 0.1, mp.z - 0.2) }
        } else {
          introGoal(intro)
        }
        const L = 1 - Math.pow(0.02, dt)
        camNow.pos.lerp(camGoal.pos, L); camNow.look.lerp(camGoal.look, L)
        camera.position.copy(camNow.pos); camera.lookAt(camNow.look)

        marks.forEach((mk, i) => {
          const appear = ease((s - 1.0 - i * 0.2) / 0.8)
          const want = appear * (act < 0 ? 1 : act === i ? 1.35 : 0.35)
          mk.level += (want - mk.level) * (1 - Math.pow(0.004, dt))
          mk.mat.opacity = Math.min(1, mk.level)
          mk.mat.emissiveIntensity = act === i ? 0.35 : 0.04
        })

        const pa = dG.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < DN; i++) { let y = pa.getY(i) + 0.0016; if (y > 3.2) y = 0; pa.setY(i, y); pa.setX(i, pa.getX(i) + Math.sin(t * 0.3 + ds[i]) * 0.001) }
        pa.needsUpdate = true

        film.uniforms.uTime.value = t
        composer.render()
      }
      frame()
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
