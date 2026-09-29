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
 * Yalnızca masaüstünde, tembel yüklenir (bkz. SahneHero). Tekerlek dinlenmez.
 * Dokular kod ile üretilir; dışarıdan görsel dosyası yok.
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

    ;(async () => {
      try { await Promise.race([document.fonts.load('400 100px Anton', 'TECHNE LAB'), new Promise((r) => setTimeout(r, 700))]) } catch { /* yoksay */ }
      if (disposed) return
      const P = propsRef.current.programs
      const N = P.length
      if (N === 0) return

      /* ── Renderer ─────────────────────────────────────────── */
      THREE.ColorManagement.legacyMode = false
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
      const DPR = Math.min(window.devicePixelRatio || 1, 1.75)
      renderer.setPixelRatio(DPR)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      cleanups.push(() => renderer.dispose())

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(BG)
      scene.fog = new THREE.FogExp2(BG, 0.09)
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80)

      /* ── Zemin: eski sahne tahtası ─────────────────────────── */
      const floorTex = canvasTex(1024, 1024, (x, w, h) => {
        x.fillStyle = '#121110'; x.fillRect(0, 0, w, h)
        const board = 64
        for (let y = 0; y < h; y += board) {
          x.fillStyle = `rgba(${Math.random() > 0.5 ? '255,240,220' : '0,0,0'},${0.015 + Math.random() * 0.03})`; x.fillRect(0, y, w, board)
          x.fillStyle = 'rgba(0,0,0,.6)'; x.fillRect(0, y + board - 2, w, 2)
          let bx = Math.random() * 300
          while (bx < w) { x.fillStyle = 'rgba(0,0,0,.45)'; x.fillRect(bx, y, 2, board); bx += 260 + Math.random() * 380 }
        }
        for (let i = 0; i < 900; i++) {
          x.strokeStyle = `rgba(255,240,220,${Math.random() * 0.05})`; x.lineWidth = Math.random() * 1.4
          x.beginPath(); const sx = Math.random() * w, sy = Math.random() * h
          x.moveTo(sx, sy); x.lineTo(sx + (Math.random() - 0.5) * 120, sy + (Math.random() - 0.5) * 14); x.stroke()
        }
        for (let i = 0; i < 20000; i++) { x.fillStyle = `rgba(255,255,255,${Math.random() * 0.035})`; x.fillRect(Math.random() * w, Math.random() * h, 1, 1) }
      })
      floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(4, 4); floorTex.anisotropy = 8
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.62, metalness: 0.05 }))
      floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor)

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
      lamp.shadow.mapSize.set(2048, 2048); lamp.shadow.bias = -0.0005; lamp.shadow.radius = 3; gl.add(lamp)
      scene.add(new THREE.HemisphereLight(0x8a8a90, 0x000000, 0.02))
      const haloTex = canvasTex(256, 256, (x, w, h) => {
        const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2)
        g.addColorStop(0, 'rgba(255,230,190,.9)'); g.addColorStop(0.25, 'rgba(255,220,170,.25)'); g.addColorStop(1, 'rgba(255,220,170,0)')
        x.fillStyle = g; x.fillRect(0, 0, w, h)
      })
      const haloMat = new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 })
      const halo = new THREE.Sprite(haloMat); halo.scale.set(1.6, 1.6, 1); halo.position.y = BULB_Y; gl.add(halo)

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
        x.fillText(p.sub.toLocaleUpperCase('tr-TR'), 128, 196)
      })
      P.forEach((p, i) => {
        // iki sıra, şaşırtmalı yay: komşu iki bant aynı sırada değil
        const u = N === 1 ? 0.5 : i / (N - 1)
        const a = Math.PI * (0.18 + 0.64 * u)
        const rr = i % 2 ? R * 1.5 : R * 0.95
        const x = Math.cos(a) * rr * -1.15, z = Math.sin(a) * rr * 0.62 + 0.15
        const map = markTexture(i, p); map.anisotropy = 8
        const mat = new THREE.MeshStandardMaterial({ map, emissiveMap: map, emissive: 0xffffff, emissiveIntensity: 0, transparent: true, roughness: 0.7, depthWrite: false, opacity: 0 })
        const m = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.55), mat)
        m.rotation.x = -Math.PI / 2; m.rotation.z = Math.atan2(-x, 6) * 0.35
        m.position.set(x - 0.7, 0.006, z); m.receiveShadow = true; scene.add(m)
        const hit = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 0.7), new THREE.MeshBasicMaterial({ visible: false }))
        hit.position.set(x - 0.7, 0.2, z); hit.userData.i = i; scene.add(hit); hits.push(hit)
        marks.push({ mat, level: 0, pos: new THREE.Vector3(x - 0.7, 0, z) })
      })

      /* ── Toz ───────────────────────────────────────────────── */
      const DN = 380, dp = new Float32Array(DN * 3), ds = new Float32Array(DN)
      for (let i = 0; i < DN; i++) { const r = Math.random() * 1.3, a = Math.random() * 6.28; dp[i * 3] = Math.cos(a) * r; dp[i * 3 + 1] = Math.random() * 3; dp[i * 3 + 2] = Math.sin(a) * r; ds[i] = Math.random() * 100 }
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

      /* ── Kamera / girdi ────────────────────────────────────── */
      const look = new THREE.Vector3(0.35, 0.95, 0.4)
      let mx = 0, my = 0, tmx = 0, tmy = 0
      const pointer = new THREE.Vector2(9, 9)
      const camGoal = { pos: new THREE.Vector3(), look: look.clone() }
      const camNow = { pos: new THREE.Vector3(1.2, 4.4, 12.5), look: look.clone() }
      const ray = new THREE.Raycaster()
      const tmpV = new THREE.Vector3()
      let hover3d = -1

      on(window, 'pointermove', (e: PointerEvent) => {
        const r = host.getBoundingClientRect()
        tmx = ((e.clientX - r.left) / r.width - 0.5) * 2; tmy = ((e.clientY - r.top) / r.height - 0.5) * 2
        pointer.set(tmx, -tmy)
      })
      on(canvas, 'click', () => {
        const pr = propsRef.current
        if (hover3d >= 0) pr.onSelect(hover3d)
        else if (pr.focused >= 0) pr.onUnfocus()
      })

      const resize = () => {
        const w = host.clientWidth, h = host.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h)
        film.uniforms.uRes.value.set(w, h)
        camera.aspect = w / h; camera.fov = w / h < 1 ? 52 : 34; camera.updateProjectionMatrix()
      }
      const ro = new ResizeObserver(resize); ro.observe(host); cleanups.push(() => ro.disconnect())
      resize()

      let visible = true, pageVisible = !document.hidden
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.05 }); io.observe(host); cleanups.push(() => io.disconnect())
      on(document, 'visibilitychange', () => { pageVisible = !document.hidden })

      /* ── Döngü ─────────────────────────────────────────────── */
      const ease = (x: number) => { x = THREE.MathUtils.clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3) }
      const clock = new THREE.Clock()
      let start = -1, ready = false

      const frame = () => {
        if (disposed) return
        raf = requestAnimationFrame(frame)
        if (!visible || !pageVisible) return
        const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime
        const pr = propsRef.current
        const focused = pr.focused
        if (!ready) { ready = true; start = performance.now() + 250; pr.onReady() }
        const s = Math.max(0, (performance.now() - start) / 1000)
        mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05

        // ampul: kısa arızalı ateşleme, sonra nefes alan sabit ışık
        const ign = s < 0.6 ? 0 : s < 1.4 ? (Math.random() > 0.5 ? 1 : 0.1) : 1
        const flick = ign * (0.94 + Math.sin(t * 2.1) * 0.025 + Math.sin(t * 17.3) * 0.012 + (Math.random() > 0.997 ? -0.35 : 0))
        tmpV.set(0, BULB_Y, 0).project(camera)
        const near = 1 - Math.min(1, Math.hypot(pointer.x - tmpV.x, (pointer.y - tmpV.y) * 0.8) / 1.1)

        let hv = -1
        if (focused < 0) { ray.setFromCamera(pointer, camera); const hs = ray.intersectObjects(hits); if (hs.length) hv = hs[0].object.userData.i as number }
        if (hv !== hover3d) { hover3d = hv; canvas.style.cursor = hv >= 0 ? 'pointer' : ''; pr.onHover(hv) }
        const act = focused >= 0 ? focused : hover3d >= 0 ? hover3d : pr.hover

        const boost = 1 + near * 0.35 + (act >= 0 ? 0.25 : 0)
        lamp.intensity = flick * 2.6 * boost
        bulbMat.emissiveIntensity = 1.4 + flick * 2.2 * boost
        haloMat.opacity = flick * 0.55
        filMat.color.setHex(NEON).multiplyScalar(0.4 + flick * 0.8)
        dustMat.opacity = ease((s - 1.4) / 2) * 0.55

        const intro = ease(s / 5)
        if (focused >= 0 && marks[focused]) {
          const mp = marks[focused].pos
          camGoal.pos.set(mp.x * 0.8 + 0.6, 2.2, mp.z + 3.4); camGoal.look.set(mp.x + 0.3, 0.1, mp.z - 0.2)
        } else {
          camGoal.pos.set(1.2 + mx * 0.9, 3.2 - my * 0.35 + (1 - intro) * 1.2, 9.2 + (1 - intro) * 3.5); camGoal.look.copy(look)
        }
        const L = 1 - Math.pow(0.02, dt)
        camNow.pos.lerp(camGoal.pos, L); camNow.look.lerp(camGoal.look, L)
        camera.position.copy(camNow.pos); camera.lookAt(camNow.look)

        marks.forEach((mk, i) => {
          const appear = ease((s - 1.6 - i * 0.22) / 0.8)
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
