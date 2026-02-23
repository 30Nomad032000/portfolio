"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "motion/react"

export function AnimateNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.5,
  className,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`)
      },
    })

    return () => controls.stop()
  }, [isInView, value, suffix, prefix, decimals, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
