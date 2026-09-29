'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import type { SahneProgram } from './sahneVeri'

/**
 * Sahne — ana sayfa 3D'si.
 *
 * Kara kutu sahne, kadife perde, neon tabela, ışık köprüsü ve her program için
 * ön yüzüne adı kazınmış bir beton monolit. Etkileşim iki yönlü: sahnedeki
 * bloğa gelince liste satırı yanar (onHover), listedeki satıra gelince blok
 * yükselir (hover prop'u). Tıklama kamerayı bloğa yaklaştırır (focused).
 *
 * Bu bileşen yalnızca masaüstünde, tembel yüklenir (bkz. SahneHero). Tekerlek
 * dinlenmez: sayfa normal kaydırılır. Sürükleme kamerayı döndürür.
 *
 * Tüm dokular kod ile üretilir (canvas); dışarıdan görsel/font dosyası yok.
 * Tabela ve blok yazıları Anton ile çizilir; font hazır değilse Impact'e düşer.
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
const STAGE_Y = 0.72
// Blok oranları: programın karakterini taşır ama dil tek (beton, sert gölge, tek neon).
const DIMS: [number, number, number][] = [
  [1.25, 2.8, 0.7], [1.45, 1.75, 1.0], [0.95, 3.3, 0.6], [1.65, 2.3, 0.8], [1.15, 2.5, 0.7], [1.8, 1.3, 1.1],
  [1.3, 2.1, 0.8], [1.1, 2.9, 0.65], [1.5, 1.6, 0.9],
]
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

/** Béton brut: kalıp tahtası izi, gözenek, leke, bağlantı deliği. Tohumlu; her blok kendine özgü ama kararlı. */
function concreteCanvas(w: number, h: number, seed: number) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h
  const x = cv.getContext('2d')!
  let r = seed * 9301 + 49297
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280
  x.fillStyle = '#86857f'; x.fillRect(0, 0, w, h)
  const plank = Math.max(60, Math.round(w / 3.2))
  for (let y = 0; y < h; y += plank) {
    x.fillStyle = `rgba(${rnd() > 0.5 ? '255,255,255' : '0,0,0'},${0.015 + rnd() * 0.035})`; x.fillRect(0, y, w, plank)
    x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(0, y + plank - 1, w, 1)
    for (let g = 0; g < 40; g++) { x.fillStyle = `rgba(0,0,0,${rnd() * 0.05})`; x.fillRect(0, y + rnd() * plank, w, 1) }
  }
  for (let i = 0; i < (w * h) / 55; i++) { x.fillStyle = `rgba(0,0,0,${rnd() * 0.22})`; const q = rnd() * 2 + 0.5; x.fillRect(rnd() * w, rnd() * h, q, q) }
  for (let i = 0; i < 18; i++) {
    const gx = rnd() * w, gy = rnd() * h, gr = rnd() * w * 0.35 + 20
    const g = x.createRadialGradient(gx, gy, 0, gx, gy, gr); g.addColorStop(0, `rgba(0,0,0,${rnd() * 0.14})`); g.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = g; x.fillRect(0, 0, w, h)
  }
  const cols = Math.max(2, Math.round(w / 170)), rows = Math.max(2, Math.round(h / 170))
  for (let c = 0; c < cols; c++) for (let rr = 0; rr < rows; rr++) {
    const px = ((c + 0.5) * w) / cols, py = ((rr + 0.5) * h) / rows
    x.fillStyle = 'rgba(0,0,0,.55)'; x.beginPath(); x.arc(px, py, 7, 0, 7); x.fill()
    x.fillStyle = 'rgba(255,255,255,.12)'; x.beginPath(); x.arc(px + 1, py + 2, 7, 0.2, 2.9); x.fill()
  }
  return { cv, x }
}
function wrapLines(x: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const out: string[] = []; let line = ''
  text.split(' ').forEach((w) => {
    const t = line ? line + ' ' + w : w
    if (x.measureText(t).width > maxW && line) { out.push(line); line = w } else line = t
  })
  if (line) out.push(line)
  return out
}
function engrave(x: CanvasRenderingContext2D, text: string, px: number, py: number) {
  x.fillStyle = 'rgba(255,255,255,.16)'; x.fillText(text, px, py + 2)
  x.fillStyle = 'rgba(6,6,8,.92)'; x.fillText(text, px, py)
}

type Spot = {
  sp: THREE.SpotLight
  cone: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshBasicMaterial>
  pool: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>
  ring: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>
  lens: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>
  fig: THREE.Group
  front: THREE.MeshStandardMaterial
  h: number
  level: number
  target: THREE.Vector3
}

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
    const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Window, k: K | string, f: (e: any) => void, o?: AddEventListenerOptions) => {
      el.addEventListener(k as string, f, o); cleanups.push(() => el.removeEventListener(k as string, f))
    }

    ;(async () => {
      // Marka fontu: en fazla 1,5 sn bekle, gelmezse Impact ile çiz.
      try { await Promise.race([document.fonts.load('400 100px Anton', 'TECHNE İŞ'), new Promise((r) => setTimeout(r, 1500))]) } catch { /* yoksay */ }
      if (disposed) return
      const P = propsRef.current.programs
      const N = P.length
      if (N === 0) return

      /* ── Renderer ─────────────────────────────────────────── */
      THREE.ColorManagement.legacyMode = false
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' })
      const DPR = Math.min(window.devicePixelRatio || 1, 1.75)
      renderer.setPixelRatio(DPR)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      cleanups.push(() => renderer.dispose())

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(BG)
      scene.fog = new THREE.FogExp2(BG, 0.05)
      const camera = new THREE.PerspectiveCamera(36, 1, 0.5, 120)
      scene.add(new THREE.HemisphereLight(0x9a9a9a, 0x000000, 0.045))

      /* ── Dokular ───────────────────────────────────────────── */
      const coneTex = canvasTex(8, 256, (x, w, h) => {
        const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.55, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)')
        x.fillStyle = g; x.fillRect(0, 0, w, h)
      })
      const hazeTex = canvasTex(256, 256, (x, w, h) => {
        const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)')
        x.fillStyle = g; x.fillRect(0, 0, w, h)
        for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(0,0,0,${Math.random() * 0.08})`; const r = Math.random() * 40 + 10; x.beginPath(); x.arc(Math.random() * w, Math.random() * h, r, 0, 7); x.fill() }
      })
      const floorTex = canvasTex(512, 512, (x, w, h) => {
        x.fillStyle = '#1a1a1d'; x.fillRect(0, 0, w, h)
        for (let i = 0; i < 16; i++) { x.fillStyle = `rgba(255,255,255,${0.012 + Math.random() * 0.02})`; x.fillRect(0, i * 32, w, 31); x.fillStyle = 'rgba(0,0,0,.5)'; x.fillRect(0, i * 32 + 31, w, 1) }
        for (let i = 0; i < 4000; i++) { x.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`; x.fillRect(Math.random() * w, Math.random() * h, 1, 1) }
      })
      floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(3, 2)

      /* ── Kara kutu ─────────────────────────────────────────── */
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: 0x0c0c0e, roughness: 0.95 }))
      floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor)
      const stageBody = new THREE.Mesh(new THREE.BoxGeometry(13, STAGE_Y, 7.4), new THREE.MeshStandardMaterial({ color: 0x0f0f11, roughness: 0.8 }))
      stageBody.position.set(0, STAGE_Y / 2 - 0.001, -1.6); stageBody.castShadow = true; scene.add(stageBody)

      const W0 = host.clientWidth || 1200, H0 = host.clientHeight || 700
      const mirror = new Reflector(new THREE.PlaneGeometry(13, 7.4), { clipBias: 0.003, textureWidth: W0 * DPR * 0.5, textureHeight: H0 * DPR * 0.5, color: 0x46464c })
      mirror.rotation.x = -Math.PI / 2; mirror.position.set(0, STAGE_Y + 0.001, -1.6); scene.add(mirror)
      const stageTop = new THREE.Mesh(new THREE.PlaneGeometry(13, 7.4), new THREE.MeshStandardMaterial({ map: floorTex, color: 0xffffff, roughness: 0.35, metalness: 0.2, transparent: true, opacity: 0.8 }))
      stageTop.rotation.x = -Math.PI / 2; stageTop.position.set(0, STAGE_Y + 0.004, -1.6); stageTop.receiveShadow = true; scene.add(stageTop)

      const lip = new THREE.Mesh(new THREE.BoxGeometry(13, 0.022, 0.022), new THREE.MeshBasicMaterial({ color: NEON }))
      lip.position.set(0, STAGE_Y + 0.01, 2.1); scene.add(lip)

      const back = new THREE.Mesh(new THREE.PlaneGeometry(20, 12), new THREE.MeshStandardMaterial({ color: 0x070708, roughness: 1 }))
      back.position.set(0, 6, -5.4); back.receiveShadow = true; scene.add(back)
      const cyc = new THREE.Mesh(new THREE.PlaneGeometry(13, 7), new THREE.MeshStandardMaterial({ color: 0x040405, roughness: 1 }))
      cyc.position.set(0, 3.9, -5.37); scene.add(cyc)

      const frameMat = new THREE.MeshStandardMaterial({ color: 0x0e0e10, roughness: 0.6, metalness: 0.1 })
      const addBox = (w: number, h: number, d: number, x: number, y: number, z: number) => {
        const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), frameMat); b.position.set(x, y, z); b.castShadow = b.receiveShadow = true; scene.add(b)
      }
      addBox(0.9, 7.4, 0.7, -6.95, 3.7, 2.25); addBox(0.9, 7.4, 0.7, 6.95, 3.7, 2.25); addBox(14.8, 1.2, 0.7, 0, 6.8, 2.25)
      const inner = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(13, 6.2)), new THREE.LineBasicMaterial({ color: NEON, transparent: true, opacity: 0.45 }))
      inner.position.set(0, STAGE_Y + 3.1 - 0.02, 1.89); scene.add(inner)

      /* ── Perdeler ──────────────────────────────────────────── */
      const velvet = new THREE.MeshPhysicalMaterial({ color: 0x151518, roughness: 0.9, sheen: 1, sheenRoughness: 0.5, sheenColor: new THREE.Color(0x5a5a64), side: THREE.DoubleSide })
      type Drape = THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhysicalMaterial> & { base: Float32Array }
      const makeDrape = (w: number, h: number, sx: number, sy: number, x: number, y: number, z: number): Drape => {
        const g = new THREE.PlaneGeometry(w, h, sx, sy)
        const m = new THREE.Mesh(g, velvet) as Drape
        m.base = new Float32Array((g.attributes.position as THREE.BufferAttribute).array as Float32Array)
        m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; scene.add(m); return m
      }
      const curtains = [makeDrape(3.2, 6.2, 90, 20, -5.1, STAGE_Y + 3.1, 1.75), makeDrape(3.2, 6.2, 90, 20, 5.1, STAGE_Y + 3.1, 1.75)]
      const valance = makeDrape(13.2, 0.9, 120, 4, 0, 6.4, 1.8)
      const drapeUpdate = (mesh: Drape, t: number, open: number, amp: number, freq: number, gather: number) => {
        const pos = mesh.geometry.attributes.position as THREE.BufferAttribute, b = mesh.base
        for (let i = 0; i < pos.count; i++) {
          const x = b[i * 3], y = b[i * 3 + 1]
          const g = 1 - gather * open, k = y / 6.2 + 0.5
          pos.setX(i, x * g)
          pos.setZ(i, Math.sin((x * freq) / Math.max(g, 0.35)) * amp * (0.6 + open * 0.6) + Math.sin(t * 0.8 + y * 0.9 + x) * 0.02 * (1 - k * 0.5))
        }
        pos.needsUpdate = true; mesh.geometry.computeVertexNormals()
      }

      /* ── Neon tabela ───────────────────────────────────────── */
      const signTex = canvasTex(2048, 720, (x, W, H) => {
        x.textAlign = 'center'; x.textBaseline = 'alphabetic'
        const draw = (txt: string, size: number, y: number, track: number) => {
          x.font = `400 ${size}px ${FONT}`
          const chars = [...txt], widths = chars.map((c) => x.measureText(c).width)
          const total = widths.reduce((a, b) => a + b, 0) + track * (chars.length - 1)
          let cx = W / 2 - total / 2
          chars.forEach((c, k) => {
            const mid = cx + widths[k] / 2
            x.shadowColor = 'rgba(200,255,0,.9)'; x.shadowBlur = size * 0.08; x.fillStyle = '#C8FF00'; x.fillText(c, mid, y)
            x.shadowBlur = 0; x.fillStyle = 'rgba(245,255,200,.55)'; x.fillText(c, mid, y)
            cx += widths[k] + track
          })
        }
        draw('TECHNE LAB', 400, 430, 14)
        draw('İSTANBUL', 150, 640, 62)
        void H
      })
      signTex.anisotropy = 8
      const signMat = new THREE.MeshBasicMaterial({ map: signTex, transparent: true, depthWrite: false })
      const neonSign = new THREE.Mesh(new THREE.PlaneGeometry(7.4, (7.4 * 720) / 2048), signMat)
      neonSign.position.set(0, 4.85, -5.18); scene.add(neonSign)
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 3.2), new THREE.MeshStandardMaterial({ color: 0x050506, roughness: 0.9 }))
      plate.position.set(0, 4.85, -5.3); scene.add(plate)
      const neonLight = new THREE.PointLight(NEON, 0, 9, 2); neonLight.position.set(0, 5, -4.6); scene.add(neonLight)

      /* ── Işık köprüsü ──────────────────────────────────────── */
      const trussMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2e, roughness: 0.4, metalness: 0.8 })
      ;[0.8, 1.4].forEach((z) => { const t = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 13, 10), trussMat); t.rotation.z = Math.PI / 2; t.position.set(0, 8.6, z); scene.add(t) })
      for (let i = -12; i <= 12; i++) { const r = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.62, 6), trussMat); r.rotation.x = Math.PI / 2; r.rotation.z = (i % 2) * 0.7; r.position.set(i * 0.52, 8.6, 1.1); scene.add(r) }

      /* ── Monolitler ────────────────────────────────────────── */
      const makeMonolith = (i: number, prog: SahneProgram) => {
        const [w, h, dpt] = DIMS[i % DIMS.length]
        const W = 512, H = Math.round((512 * h) / w)
        const { cv, x } = concreteCanvas(W, H, i + 3)
        const pad = W * 0.085
        const numSize = Math.round(W * 0.34), titleSize = Math.round(W * (w < 1 ? 0.15 : 0.135)), subSize = Math.round(W * 0.05)
        const num = String(i + 1).padStart(2, '0')
        x.textBaseline = 'top'
        x.font = `400 ${numSize}px ${FONT}`; x.fillStyle = '#C8FF00'; x.fillText(num, pad - 4, pad * 0.6)
        x.font = `400 ${titleSize}px ${FONT}`
        let y = pad * 0.6 + numSize * 1.02
        wrapLines(x, prog.title.toLocaleUpperCase('tr-TR'), W - pad * 2).forEach((l) => { engrave(x, l, pad, y); y += titleSize * 1.02 })
        x.font = `700 ${subSize}px "JetBrains Mono", "Courier New", monospace`
        engrave(x, prog.sub.toLocaleUpperCase('tr-TR'), pad, y + subSize * 0.6)
        x.fillStyle = '#C8FF00'; x.fillRect(pad, H - pad * 0.9, W * 0.18, 5)

        const mcv = document.createElement('canvas'); mcv.width = W; mcv.height = H
        const m = mcv.getContext('2d')!
        m.fillStyle = '#000'; m.fillRect(0, 0, W, H); m.textBaseline = 'top'
        m.font = `400 ${numSize}px ${FONT}`; m.fillStyle = '#fff'; m.fillText(num, pad - 4, pad * 0.6)
        m.fillRect(pad, H - pad * 0.9, W * 0.18, 5)

        const faceTex = new THREE.CanvasTexture(cv); faceTex.encoding = THREE.sRGBEncoding; faceTex.anisotropy = 8
        const maskTex = new THREE.CanvasTexture(mcv); maskTex.anisotropy = 8
        const sideTex = new THREE.CanvasTexture(concreteCanvas(256, Math.round((256 * h) / dpt), i + 11).cv); sideTex.encoding = THREE.sRGBEncoding
        const topTex = new THREE.CanvasTexture(concreteCanvas(256, 256, i + 23).cv); topTex.encoding = THREE.sRGBEncoding
        const mSide = new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.95, metalness: 0 })
        const mTop = new THREE.MeshStandardMaterial({ map: topTex, roughness: 0.95 })
        const front = new THREE.MeshStandardMaterial({ map: faceTex, roughness: 0.92, emissive: 0xffffff, emissiveMap: maskTex, emissiveIntensity: 0 })
        const g = new THREE.BoxGeometry(w, h, dpt); g.translate(0, h / 2, 0)
        const block = new THREE.Mesh(g, [mSide, mSide, mTop, mTop, front, mSide])
        block.castShadow = true; block.receiveShadow = true
        const grp = new THREE.Group(); grp.add(block)
        return { grp, front, h }
      }

      /* ── Spotlar ───────────────────────────────────────────── */
      const spots: Spot[] = []
      const hitTargets: THREE.Mesh[] = []
      P.forEach((prog, i) => {
        const u = N === 1 ? 0.5 : i / (N - 1)
        const x = -4.7 + u * 9.4, z = -3.0 + Math.sin(u * Math.PI) * 1.5
        const target = new THREE.Vector3(x, STAGE_Y, z)
        const origin = new THREE.Vector3(x * 0.62, 8.45, 1.1)
        const dir = target.clone().sub(origin).normalize()
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir)

        const can = new THREE.Group()
        can.add(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.46, 20), trussMat))
        const lens = new THREE.Mesh(new THREE.CircleGeometry(0.15, 24), new THREE.MeshBasicMaterial({ color: 0xfff4e0 }))
        lens.position.y = -0.235; lens.rotation.x = Math.PI / 2; can.add(lens)
        can.position.copy(origin); can.quaternion.copy(q); scene.add(can)

        const sp = new THREE.SpotLight(0xfff1dc, 0, 14, 0.2, 0.6, 1.4)
        sp.position.copy(origin); sp.target.position.copy(target)
        sp.castShadow = i % 2 === 1; sp.shadow.mapSize.set(1024, 1024); sp.shadow.bias = -0.0004
        scene.add(sp, sp.target)

        const h = origin.distanceTo(target)
        const coneG = new THREE.CylinderGeometry(0.1, Math.tan(0.2) * h * 1.05, h, 48, 1, true); coneG.translate(0, -h / 2, 0)
        const cone = new THREE.Mesh(coneG, new THREE.MeshBasicMaterial({ color: 0xfff0d6, map: coneTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
        cone.position.copy(origin); cone.quaternion.copy(q); scene.add(cone)

        const pool = new THREE.Mesh(new THREE.CircleGeometry(Math.tan(0.2) * h * 1.05, 48), new THREE.MeshBasicMaterial({ color: 0xfff0d6, map: hazeTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }))
        pool.rotation.x = -Math.PI / 2; pool.position.copy(target).add(new THREE.Vector3(0, 0.012, 0)); scene.add(pool)

        const ring = new THREE.Mesh(new THREE.RingGeometry(0.95, 0.975, 96), new THREE.MeshBasicMaterial({ color: NEON, transparent: true, opacity: 0 }))
        ring.rotation.x = -Math.PI / 2; ring.position.copy(target).add(new THREE.Vector3(0, 0.014, 0)); scene.add(ring)

        const { grp, front, h: bh } = makeMonolith(i, prog)
        grp.position.copy(target); grp.rotation.y = Math.atan2(1.2 - x, 16 - z) * 0.85; grp.scale.y = 0.001
        scene.add(grp)

        const hit = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 3.2, 12), new THREE.MeshBasicMaterial({ visible: false }))
        hit.position.copy(target).add(new THREE.Vector3(0, 1.6, 0)); hit.userData.i = i; scene.add(hit); hitTargets.push(hit)

        spots.push({ sp, cone, pool, ring, lens, fig: grp, front, h: bh, level: 0, target })
      })

      /* ── Duman, toz, seyirci ───────────────────────────────── */
      const hazes: Array<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> & { s: number; o: number }> = []
      for (let i = 0; i < 3; i++) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(9, 4), new THREE.MeshBasicMaterial({ map: hazeTex, color: 0x9fa2aa, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })) as (typeof hazes)[number]
        m.position.set((Math.random() - 0.5) * 12, STAGE_Y + 0.5 + Math.random() * 1.2, -4 + Math.random() * 5.5)
        m.s = Math.random() * 10; m.o = 0.008 + Math.random() * 0.01
        scene.add(m); hazes.push(m)
      }
      const DN = 1400, dpos = new Float32Array(DN * 3), dseed = new Float32Array(DN)
      for (let i = 0; i < DN; i++) { dpos[i * 3] = (Math.random() - 0.5) * 12; dpos[i * 3 + 1] = Math.random() * 8 + 0.8; dpos[i * 3 + 2] = (Math.random() - 0.5) * 6.5 - 0.9; dseed[i] = Math.random() * 100 }
      const dustG = new THREE.BufferGeometry(); dustG.setAttribute('position', new THREE.BufferAttribute(dpos, 3))
      scene.add(new THREE.Points(dustG, new THREE.PointsMaterial({ color: 0xfff3dc, size: 0.022, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false })))

      const seatM = new THREE.MeshStandardMaterial({ color: 0x17171a, roughness: 0.85 })
      const R = 6, C = 16
      const seats = new THREE.InstancedMesh(new THREE.BoxGeometry(0.56, 0.08, 0.5), seatM, R * C)
      const backs = new THREE.InstancedMesh(new THREE.BoxGeometry(0.56, 0.55, 0.07), seatM, R * C)
      const d = new THREE.Object3D(); let k = 0
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
        const ang = (c - (C - 1) / 2) * 0.045, rad = 7.5 + r * 0.95, x = Math.sin(ang) * rad, z = Math.cos(ang) * rad - 2.6, y = 0.42 + r * 0.3
        d.position.set(x, y, z); d.rotation.set(0, ang, 0); d.updateMatrix(); seats.setMatrixAt(k, d.matrix)
        d.position.set(x + Math.sin(ang) * 0.25, y + 0.3, z + Math.cos(ang) * 0.25); d.updateMatrix(); backs.setMatrixAt(k, d.matrix); k++
      }
      seats.receiveShadow = backs.receiveShadow = true; scene.add(seats, backs)

      /* ── Post: bloom + film ────────────────────────────────── */
      const composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      const bloom = new UnrealBloomPass(new THREE.Vector2(W0, H0), 0.8, 0.5, 0.72)
      composer.addPass(bloom)
      const film = new ShaderPass({
        uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) }, uFocus: { value: 0 } },
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: `
          uniform sampler2D tDiffuse; uniform float uTime; uniform vec2 uRes; uniform float uFocus; varying vec2 vUv;
          vec3 aces(vec3 x){ const float a=2.51,b=.03,c=2.43,d=.59,e=.14; return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.,1.); }
          float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
          void main(){
            vec2 uv = vUv, c = uv - .5;
            vec3 col = texture2D(tDiffuse, uv).rgb;
            col = aces(col * 1.35);
            col = pow(col, vec3(1./2.2));
            float v = smoothstep(.95, .25, length(c*vec2(1.15,1.)));
            col *= mix(.35, 1., v) - uFocus*.12*(1.-v);
            float g = h(uv*uRes + fract(uTime)*97.) - .5;
            col += g * .045;
            gl_FragColor = vec4(col, 1.);
          }`,
      })
      film.renderToScreen = true; composer.addPass(film)

      /* ── Kamera ────────────────────────────────────────────── */
      const home = { look: new THREE.Vector3(1.2, 2.2, -1.2), dist: 17.5, yaw: 0, pitch: 0.14 }
      const cam = { look: home.look.clone(), dist: home.dist, yaw: 0, pitch: 0.15 }
      const goal = { look: home.look.clone(), dist: home.dist, yaw: 0, pitch: 0.15 }
      let dragging = false, lx = 0, ly = 0, moved = 0, mx = 0, my = 0, idle = 0
      let lastFocused = -1
      const pointer = new THREE.Vector2(9, 9)
      const ray = new THREE.Raycaster()

      const place = (push: number, focusedNow: boolean) => {
        const dd = cam.dist + push
        const p = new THREE.Vector3(Math.sin(cam.yaw) * Math.cos(cam.pitch), Math.sin(cam.pitch), Math.cos(cam.yaw) * Math.cos(cam.pitch)).multiplyScalar(dd).add(cam.look)
        const k = focusedNow ? 0.3 : 1
        p.x += mx * 0.45 * k; p.y -= my * 0.25 * k
        camera.position.copy(p); camera.lookAt(cam.look)
      }
      const rect = () => host.getBoundingClientRect()
      on(canvas, 'pointerdown', (e: PointerEvent) => { dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; canvas.style.cursor = 'grabbing' })
      on(window, 'pointerup', () => { dragging = false; canvas.style.cursor = '' })
      on(window, 'pointermove', (e: PointerEvent) => {
        const r = rect()
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2; my = ((e.clientY - r.top) / r.height - 0.5) * 2
        pointer.set(mx, -my); idle = 0
        if (!dragging) return
        const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy)
        goal.yaw = THREE.MathUtils.clamp(goal.yaw - dx * 0.005, -1.1, 1.1); goal.pitch = THREE.MathUtils.clamp(goal.pitch + dy * 0.003, 0.02, 0.6)
      })
      on(canvas, 'click', () => {
        if (moved > 6) return
        const pr = propsRef.current
        if (hover3d >= 0) pr.onSelect(hover3d)
        else if (pr.focused >= 0) pr.onUnfocus()
      })

      /* ── Boyut ─────────────────────────────────────────────── */
      const resize = () => {
        const w = host.clientWidth, h = host.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h)
        film.uniforms.uRes.value.set(w, h)
        camera.aspect = w / h; camera.fov = w < 900 ? 50 : 36; camera.updateProjectionMatrix()
        home.dist = w / h < 1 ? 21 : w / h < 1.4 ? 19 : 17.5
        if (propsRef.current.focused < 0) goal.dist = home.dist
      }
      const ro = new ResizeObserver(resize); ro.observe(host); cleanups.push(() => ro.disconnect())
      resize()

      // Görünmüyorsa çizme: sekme arkada ya da hero ekran dışında.
      let visible = true, pageVisible = !document.hidden
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.05 }); io.observe(host); cleanups.push(() => io.disconnect())
      on(document as unknown as HTMLElement, 'visibilitychange', () => { pageVisible = !document.hidden })

      /* ── Döngü ─────────────────────────────────────────────── */
      const ease = (x: number) => { x = THREE.MathUtils.clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3) }
      const clock = new THREE.Clock()
      let start = -1, hover3d = -1, ready = false

      const frame = () => {
        if (disposed) return
        raf = requestAnimationFrame(frame)
        if (!visible || !pageVisible) return
        const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime
        const pr = propsRef.current
        const focused = pr.focused
        if (!ready) { ready = true; start = performance.now() + 250; pr.onReady() }
        const s = Math.max(0, (performance.now() - start) / 1000)
        idle += dt

        // odak değişimi: kamera hedefi
        if (focused !== lastFocused) {
          lastFocused = focused
          if (focused >= 0 && spots[focused]) {
            const sp = spots[focused]
            goal.look.copy(sp.target).add(new THREE.Vector3(0, sp.h * 0.55, 0))
            goal.dist = 5.6; goal.yaw = THREE.MathUtils.clamp(sp.target.x * 0.07, -0.4, 0.4); goal.pitch = 0.2
          } else { goal.look.copy(home.look); goal.dist = home.dist; goal.pitch = home.pitch }
        }
        if (focused < 0 && idle > 4 && !dragging) goal.yaw = Math.sin(t * 0.08) * 0.28
        const L = 1 - Math.pow(0.001, dt * 0.9)
        cam.yaw += (goal.yaw - cam.yaw) * L; cam.pitch += (goal.pitch - cam.pitch) * L; cam.dist += (goal.dist - cam.dist) * L; cam.look.lerp(goal.look, L)
        place((1 - ease(s / 4)) * 9, focused >= 0)

        // tabela: arızalı ateşleme, sonra sabit
        const ign = s > 1.9 ? (s < 2.9 ? (Math.random() > 0.45 ? 1 : 0.08) : 1) : 0
        const flick = ign * (0.93 + Math.sin(t * 37) * 0.03 + (Math.random() > 0.995 ? -0.4 : 0))
        signMat.color.setScalar(Math.max(0.03, flick)); neonLight.intensity = flick * 1.6

        // perdeler
        const open = ease((s - 0.5) / 2.8)
        curtains[0].position.x = -5.1 - open * 1.7; curtains[1].position.x = 5.1 + open * 1.7
        curtains.forEach((c) => drapeUpdate(c, t, open, 0.16, 9, 0.42))
        drapeUpdate(valance, t, 0, 0.08, 6, 0)

        // sahne hover (odakta değilken)
        let hv = -1
        if (focused < 0 && !dragging) { ray.setFromCamera(pointer, camera); const hs = ray.intersectObjects(hitTargets); if (hs.length) hv = hs[0].object.userData.i as number }
        if (hv !== hover3d) { hover3d = hv; canvas.style.cursor = hv >= 0 ? 'pointer' : dragging ? 'grabbing' : ''; pr.onHover(hv) }
        const act = focused >= 0 ? focused : hover3d >= 0 ? hover3d : pr.hover

        spots.forEach((sp, i) => {
          const on = ease((s - 1.6 - i * 0.32) / 0.5)
          const flash = s > 1.6 + i * 0.32 && s < 1.75 + i * 0.32 ? 1.6 : 1
          const breathe = 0.88 + Math.sin(t * 0.8 + i * 1.9) * 0.12
          const want = on * flash * (act < 0 ? breathe : act === i ? 2.1 : 0.22)
          sp.level += (want - sp.level) * (1 - Math.pow(0.002, dt))
          sp.sp.intensity = sp.level * 7.5
          sp.cone.material.opacity = sp.level * (act === i ? 0.05 : 0.022)
          sp.pool.material.opacity = sp.level * 0.22
          sp.ring.material.opacity = on * (act === i ? 0.95 : 0.35)
          sp.lens.material.color.setScalar(0.25 + sp.level * 0.6).multiply(new THREE.Color(0xfff1dc))
          const fs = ease((s - 1.9 - i * 0.32) / 1.2)
          sp.fig.scale.y = Math.max(0.001, fs)
          const lift = act === i ? 0.12 : 0
          sp.fig.position.y += (sp.target.y + lift - sp.fig.position.y) * (1 - Math.pow(0.002, dt))
          sp.front.emissiveIntensity = fs * (act === i ? 2.4 : act < 0 ? 1.25 : 0.35)
        })
        ;(lip.material as THREE.MeshBasicMaterial).color.setHex(NEON).multiplyScalar(0.75 + Math.sin(t * 2) * 0.1)

        hazes.forEach((hz) => { hz.position.x += Math.sin(t * 0.1 + hz.s) * 0.004; hz.lookAt(camera.position); hz.material.opacity = hz.o * ease((s - 1) / 3) })
        const pa = dustG.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < DN; i++) { let y = pa.getY(i) - 0.0022; if (y < 0.8) y = 8.8; pa.setY(i, y); pa.setX(i, pa.getX(i) + Math.sin(t * 0.35 + dseed[i]) * 0.0012) }
        pa.needsUpdate = true

        film.uniforms.uTime.value = t
        film.uniforms.uFocus.value += ((focused >= 0 ? 1 : 0) - film.uniforms.uFocus.value) * 0.05
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

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-grab" aria-hidden="true" />
}
