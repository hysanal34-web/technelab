'use client'
import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DNA_NODES } from '@/lib/data'

// 3-D rotation helpers
function rotateY(x: number, z: number, a: number) {
  return { x: x * Math.cos(a) + z * Math.sin(a), z: -x * Math.sin(a) + z * Math.cos(a) }
}
function rotateX(y: number, z: number, a: number) {
  return { y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) }
}

interface Point3D { x: number; y: number; z: number }
interface Projected { sx: number; sy: number; z: number; scale: number }

function project(p: Point3D, ry: number, rx: number, cx: number, cy: number, fov: number): Projected {
  const ry_ = rotateY(p.x, p.z, ry)
  const rx_ = rotateX(p.y, ry_.z, rx)
  const z = rx_.z + fov
  const scale = fov / Math.max(z, 0.1)
  return { sx: cx + ry_.x * scale, sy: cy + rx_.y * scale, z: rx_.z, scale }
}

type ClickTarget = { sx: number; sy: number; r: number; href: string; label: string }

export function DNACanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const mouseRef   = useRef({ x: 0, y: 0 })
  const rotRef     = useRef({ y: 0, x: 0 })
  const targetsRef = useRef<ClickTarget[]>([])
  const router     = useRouter()

  const handleClick = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    for (const t of targetsRef.current) {
      const dx = mx - t.sx, dy = my - t.sy
      if (dx * dx + dy * dy < (t.r + 8) * (t.r + 8)) {
        router.push(t.href)
        return
      }
    }
  }, [router])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    // ── resize ──────────────────────────────────────────────────────
    function resize() {
      if (!canvas || !canvas.parentElement) return
      canvas.width  = canvas.parentElement.clientWidth  * window.devicePixelRatio
      canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio
      canvas.style.width  = canvas.parentElement.clientWidth  + 'px'
      canvas.style.height = canvas.parentElement.clientHeight + 'px'
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // ── mouse ────────────────────────────────────────────────────────
    function onMouse(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x =  (e.clientX - rect.left) / rect.width  - 0.5
      mouseRef.current.y =  (e.clientY - rect.top)  / rect.height - 0.5
    }
    window.addEventListener('mousemove', onMouse)
    canvas.addEventListener('click', handleClick)

    // ── DNA geometry ─────────────────────────────────────────────────
    const N      = 28   // base pairs
    const RADIUS = 110  // px
    const HEIGHT = 420  // px total
    const TURNS  = 2.5  // helical turns
    const FOV    = 600

    let auto = 0
    let animId: number

    function draw() {
      animId = requestAnimationFrame(draw)
      auto += 0.006

      // Smooth rotation towards mouse
      const targetY = auto + mouseRef.current.x * 1.8
      const targetX = mouseRef.current.y * 0.5
      rotRef.current.y += (targetY - rotRef.current.y) * 0.04
      rotRef.current.x += (targetX - rotRef.current.x) * 0.04

      if (!canvas) return
      const W  = canvas.clientWidth
      const H  = canvas.clientHeight
      const cx = W / 2
      const cy = H / 2

      ctx.clearRect(0, 0, W, H)

      // Collect draw items for depth sorting
      type Item =
        | { kind: 'connector'; p1: Projected; p2: Projected; depth: number }
        | { kind: 'node';      p: Projected;  strand: 1|2;   depth: number }
        | { kind: 'disc';      p: Projected;  idx: number;   depth: number }

      const items: Item[] = []

      const discInterval = Math.floor(N / DNA_NODES.length)

      for (let i = 0; i < N; i++) {
        const angle  = (i / N) * Math.PI * 2 * TURNS
        const y      = (i / (N - 1) - 0.5) * HEIGHT

        const x1 = Math.cos(angle)          * RADIUS
        const z1 = Math.sin(angle)          * RADIUS
        const x2 = Math.cos(angle + Math.PI) * RADIUS
        const z2 = Math.sin(angle + Math.PI) * RADIUS

        const p3d1: Point3D = { x: x1, y, z: z1 }
        const p3d2: Point3D = { x: x2, y, z: z2 }

        const p1 = project(p3d1, rotRef.current.y, rotRef.current.x, cx, cy, FOV)
        const p2 = project(p3d2, rotRef.current.y, rotRef.current.x, cx, cy, FOV)

        items.push({ kind: 'connector', p1, p2, depth: (p1.z + p2.z) / 2 })
        items.push({ kind: 'node', p: p1, strand: 1, depth: p1.z })
        items.push({ kind: 'node', p: p2, strand: 2, depth: p2.z })

        // Discipline disc on strand 1, evenly spaced
        if (i % discInterval === 0) {
          const idx = Math.floor(i / discInterval)
          if (idx < DNA_NODES.length) {
            items.push({ kind: 'disc', p: p1, idx, depth: p1.z })
          }
        }
      }

      // Depth sort (painter's algorithm — back to front)
      items.sort((a, b) => a.depth - b.depth)

      const newTargets: ClickTarget[] = []

      for (const item of items) {
        // Depth-based opacity: closer = more opaque
        const alpha = Math.max(0.1, Math.min(1, (item.depth + RADIUS * 1.2) / (RADIUS * 2.4)))

        if (item.kind === 'connector') {
          ctx.beginPath()
          ctx.moveTo(item.p1.sx, item.p1.sy)
          ctx.lineTo(item.p2.sx, item.p2.sy)
          ctx.strokeStyle = `rgba(10,10,12,${alpha * 0.18})`
          ctx.lineWidth   = 1.5 * Math.min(item.p1.scale, item.p2.scale)
          ctx.stroke()

        } else if (item.kind === 'node') {
          const r = 3.5 * item.p.scale
          ctx.beginPath()
          ctx.arc(item.p.sx, item.p.sy, r, 0, Math.PI * 2)
          ctx.fillStyle = item.strand === 1
            ? `rgba(10,10,12,${alpha * 0.85})`
            : `rgba(184,240,0,${alpha})`
          ctx.fill()

        } else if (item.kind === 'disc') {
          const node = DNA_NODES[item.idx]
          const r    = 11 * item.p.scale

          // Glow halo
          const grad = ctx.createRadialGradient(item.p.sx, item.p.sy, 0, item.p.sx, item.p.sy, r * 2.5)
          grad.addColorStop(0, `rgba(184,240,0,${alpha * 0.5})`)
          grad.addColorStop(1, 'rgba(184,240,0,0)')
          ctx.beginPath()
          ctx.arc(item.p.sx, item.p.sy, r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()

          // Disc
          ctx.beginPath()
          ctx.arc(item.p.sx, item.p.sy, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(184,240,0,${alpha})`
          ctx.fill()
          ctx.strokeStyle = `rgba(10,10,12,${alpha * 0.4})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Center dot
          ctx.beginPath()
          ctx.arc(item.p.sx, item.p.sy, r * 0.28, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(10,10,12,${alpha * 0.7})`
          ctx.fill()

          // Label line + text (only if close enough / high scale)
          if (item.p.scale > 0.6) {
            const lx = item.p.sx + r + 6
            const ly = item.p.sy

            ctx.beginPath()
            ctx.moveTo(item.p.sx + r, ly)
            ctx.lineTo(lx + 4, ly)
            ctx.strokeStyle = `rgba(10,10,12,${alpha * 0.35})`
            ctx.lineWidth = 1
            ctx.stroke()

            ctx.font = `${Math.round(10 * item.p.scale)}px "DM Mono", monospace`
            ctx.fillStyle = `rgba(10,10,12,${alpha * 0.9})`
            ctx.fillText(node.label.toUpperCase(), lx + 8, ly - 2)
            ctx.font = `${Math.round(8 * item.p.scale)}px "DM Mono", monospace`
            ctx.fillStyle = `rgba(10,10,12,${alpha * 0.45})`
            ctx.fillText(node.sub, lx + 8, ly + 10 * item.p.scale)
          }

          // Register click target
          newTargets.push({ sx: item.p.sx, sy: item.p.sy, r, href: node.href, label: node.label })
        }
      }

      targetsRef.current = newTargets
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: 'default' }}
    />
  )
}
