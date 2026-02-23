"use client"

import { useEffect, useRef, useState } from "react"

interface FlickeringGridProps {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  maxOpacity?: number
  className?: string
}

function parseColor(color: string): string {
  if (typeof window === "undefined") return "rgba(0, 0, 0,"
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return "rgba(0, 0, 0,"
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
  return `rgba(${r}, ${g}, ${b},`
}

export default function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  maxOpacity = 0.3,
  className = "",
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  // Store mutable props in refs so the animation loop always reads latest values
  const colorRef = useRef(parseColor(color))
  const maxOpacityRef = useRef(maxOpacity)
  const flickerChanceRef = useRef(flickerChance)

  // Update refs when props change — no remount, no effect restart
  useEffect(() => {
    colorRef.current = parseColor(color)
  }, [color])

  useEffect(() => {
    maxOpacityRef.current = maxOpacity
  }, [maxOpacity])

  useEffect(() => {
    flickerChanceRef.current = flickerChance
  }, [flickerChance])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let cols = 0
    let rows = 0
    let squares: Float32Array
    let dpr = 1
    let isInView = false

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      setCanvasSize({ width: w, height: h })
      dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      cols = Math.floor(w / (squareSize + gridGap))
      rows = Math.floor(h / (squareSize + gridGap))
      squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacityRef.current
      }
    }

    resize()

    let lastTime = 0
    const animate = (time: number) => {
      if (!isInView) return
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      const chance = flickerChanceRef.current
      const maxOp = maxOpacityRef.current
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < chance * dt) {
          squares[i] = Math.random() * maxOp
        }
      }

      const colorBase = colorRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j]
          ctx.fillStyle = `${colorBase}${opacity})`
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          )
        }
      }

      raf = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const io = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting
        if (isInView) {
          lastTime = performance.now()
          raf = requestAnimationFrame(animate)
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [squareSize, gridGap])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
