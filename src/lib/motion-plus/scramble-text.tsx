"use client"

import {
  motion,
  useIsomorphicLayoutEffect,
  useMotionValue,
  type HTMLMotionProps,
} from "motion/react"
import { forwardRef, useRef, type CSSProperties, type ElementType } from "react"

// ─── Types ───
type StaggerFunction = (index: number, total: number) => number

interface ScrambleTextControls {
  stop: () => void
  play: () => void
  finish: () => void
  finished: Promise<void>
}

interface ScrambleTextOptions {
  chars?: string | string[]
  delay?: number | StaggerFunction
  duration?: number | StaggerFunction
  interval?: number
  onComplete?: () => void
}

// ─── Constants ───
const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

// ─── Helpers ───
function getScrambleChar(chars: string | string[] | undefined): string {
  const charSet = chars ?? DEFAULT_CHARS
  return typeof charSet === "string"
    ? charSet[Math.floor(Math.random() * charSet.length)]
    : charSet[Math.floor(Math.random() * charSet.length)]
}

function resolveStagger(
  value: number | StaggerFunction | undefined,
  index: number,
  total: number,
  defaultValue: number
): number {
  if (typeof value === "function") return value(index, total)
  return value ?? defaultValue
}

// ─── Core scrambleText engine ───
function scrambleText(
  target: { get: () => string; set: (v: string) => void },
  options: ScrambleTextOptions = {}
): ScrambleTextControls {
  const {
    chars,
    delay: delayOption = 0,
    duration = 1,
    interval = 0.05,
    onComplete,
  } = options

  const originalText = target.get()
  const setText = (text: string) => target.set(text)
  const charCount = originalText.length

  type CharState = "idle" | "scrambling" | "revealed"
  const charStates: CharState[] = new Array(charCount).fill("idle")
  const cancelFns: (VoidFunction | null)[] = new Array(charCount).fill(null)

  let scrambleIntervalId: ReturnType<typeof setInterval> | null = null
  let isActive = false
  let resolveFinished: (() => void) | null = null

  const finished = new Promise<void>((resolve) => {
    resolveFinished = resolve
  })

  function updateDisplay() {
    let display = ""
    for (let i = 0; i < charCount; i++) {
      const char = originalText[i]
      if (char === " " || charStates[i] === "revealed") {
        display += char
      } else if (charStates[i] === "scrambling") {
        display += getScrambleChar(chars)
      } else {
        display += char
      }
    }
    setText(display)
  }

  function checkComplete() {
    const allRevealed = charStates.every(
      (state, i) => state === "revealed" || originalText[i] === " "
    )
    if (allRevealed) {
      stopScrambleLoop()
      onComplete?.()
      resolveFinished?.()
    }
  }

  function startScrambleLoop() {
    if (scrambleIntervalId) return
    scrambleIntervalId = setInterval(updateDisplay, interval * 1000)
  }

  function stopScrambleLoop() {
    if (scrambleIntervalId) {
      clearInterval(scrambleIntervalId)
      scrambleIntervalId = null
    }
  }

  function clearAllTimers() {
    for (let i = 0; i < cancelFns.length; i++) {
      if (cancelFns[i]) {
        cancelFns[i]!()
        cancelFns[i] = null
      }
    }
  }

  function scheduleReveal(i: number, delayMs: number) {
    const timerId = setTimeout(() => {
      if (!isActive) return
      charStates[i] = "revealed"
      updateDisplay()
      checkComplete()
    }, delayMs)
    cancelFns[i] = () => clearTimeout(timerId)
  }

  function play() {
    if (isActive) return
    isActive = true

    for (let i = 0; i < charCount; i++) {
      if (originalText[i] === " ") {
        charStates[i] = "revealed"
      } else {
        const charDelay = resolveStagger(delayOption, i, charCount, 0)
        charStates[i] = charDelay === 0 ? "scrambling" : "idle"
      }
    }

    startScrambleLoop()

    for (let i = 0; i < charCount; i++) {
      if (originalText[i] === " ") continue
      const charDelay = resolveStagger(delayOption, i, charCount, 0)
      const charDuration = resolveStagger(duration, i, charCount, 0)

      if (charDelay > 0) {
        const timerId = setTimeout(() => {
          if (!isActive) return
          charStates[i] = "scrambling"
          if (charDuration !== Infinity) {
            scheduleReveal(i, charDuration * 1000)
          }
        }, charDelay * 1000)
        cancelFns[i] = () => clearTimeout(timerId)
      } else if (charDuration !== Infinity) {
        scheduleReveal(i, charDuration * 1000)
      }
    }

    updateDisplay()
  }

  function stop() {
    clearAllTimers()
    stopScrambleLoop()
    if (!isActive) return
    isActive = false
    for (let i = 0; i < charCount; i++) charStates[i] = "revealed"
    setText(originalText)
    resolveFinished?.()
  }

  function finish() {
    if (!isActive) return
    isActive = false
    clearAllTimers()

    let minOffset = Infinity
    for (let i = 0; i < charCount; i++) {
      if (originalText[i] === " ") continue
      const charDuration = resolveStagger(duration, i, charCount, 0)
      if (charDuration !== Infinity) minOffset = Math.min(minOffset, charDuration)
    }
    if (minOffset === Infinity) minOffset = 0

    for (let i = 0; i < charCount; i++) {
      if (originalText[i] === " ") {
        charStates[i] = "revealed"
        continue
      }
      const charDuration = resolveStagger(duration, i, charCount, 0)
      const relativeOffset =
        charDuration === Infinity ? 0 : charDuration - minOffset
      if (relativeOffset === 0) {
        charStates[i] = "revealed"
      } else {
        charStates[i] = "scrambling"
        const timerId = setTimeout(() => {
          charStates[i] = "revealed"
          updateDisplay()
          checkComplete()
        }, relativeOffset * 1000)
        cancelFns[i] = () => clearTimeout(timerId)
      }
    }

    const hasScrambling = charStates.some((s) => s === "scrambling")
    if (hasScrambling) startScrambleLoop()
    else stopScrambleLoop()
    updateDisplay()
    checkComplete()
  }

  play()
  return { stop, play, finish, finished }
}

// ─── React Component ───
export interface ScrambleTextProps {
  children: string
  as?: ElementType
  active?: boolean
  delay?: number | StaggerFunction
  duration?: number | StaggerFunction
  interval?: number
  chars?: string | string[]
  onComplete?: () => void
  className?: string
  style?: CSSProperties
}

export const ScrambleText = forwardRef(function ScrambleText(
  {
    children: text = "",
    as,
    active = true,
    delay,
    duration,
    interval,
    chars,
    onComplete,
    ...props
  }: ScrambleTextProps,
  ref: React.Ref<HTMLElement>
) {
  const Tag = as || "span"
  const MotionTag = motion.create(Tag as any)
  const displayText = useMotionValue(text)
  const controlsRef = useRef<ScrambleTextControls | null>(null)
  const onCompleteRef = useRef(onComplete)

  useIsomorphicLayoutEffect(() => {
    onCompleteRef.current = onComplete
  })

  useIsomorphicLayoutEffect(() => {
    displayText.set(text)
  }, [text])

  useIsomorphicLayoutEffect(() => {
    controlsRef.current?.stop()
    displayText.set(text)
    controlsRef.current = scrambleText(displayText, {
      delay,
      duration,
      interval,
      chars,
      onComplete: () => onCompleteRef.current?.(),
    })
    if (!active) controlsRef.current.finish()
    return () => controlsRef.current?.stop()
  }, [active, text, delay, duration, interval, chars])

  return (
    <MotionTag ref={ref} {...(props as any)}>
      {displayText}
    </MotionTag>
  )
})

// ─── Stagger utility ───
export function stagger(
  each: number,
  options: { from?: "first" | "last" | "center" | number } = {}
): StaggerFunction {
  const { from = "first" } = options
  return (index: number, total: number) => {
    let origin: number
    if (from === "first") origin = 0
    else if (from === "last") origin = total - 1
    else if (from === "center") origin = (total - 1) / 2
    else origin = from
    return Math.abs(index - origin) * each
  }
}
