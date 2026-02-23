"use client"

import {
  animate,
  AnimationPlaybackControls,
  delay,
  motion,
  useMotionValue,
} from "motion/react"
import { useEffect, useRef } from "react"

/* ─── DOM helpers (inlined from motion-plus-dom) ─── */

function needsBackspace(currentText: string, fullText: string) {
  return (
    currentText.length > fullText.length ||
    (currentText.length > 0 && !fullText.startsWith(currentText))
  )
}

function findCommonPrefixIndex(current: string, target: string) {
  const commonPrefixLength = Math.min(current.length, target.length)
  let prefixLength = 0
  for (let i = 0; i < commonPrefixLength; i++) {
    if (current[i] === target[i]) {
      prefixLength = i + 1
    } else {
      break
    }
  }
  return prefixLength
}

function findPreviousWordIndex(text: string, fromIndex: number) {
  let i = fromIndex - 1
  while (i >= 0 && /\s/.test(text[i])) i--
  while (i >= 0 && !/\s/.test(text[i])) i--
  return Math.max(0, i + 1)
}

function getNextText(
  current: string,
  target: string,
  replace: "all" | "type",
  backspace: "character" | "word" | "all"
) {
  if (replace === "type" && needsBackspace(current, target)) {
    if (backspace === "all") {
      return target.slice(0, findCommonPrefixIndex(current, target))
    } else if (backspace === "word") {
      return current.slice(0, findPreviousWordIndex(current, current.length))
    } else {
      return current.slice(0, -1)
    }
  }
  return target.slice(0, current.length + 1)
}

/* ─── Natural delay ─── */

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

const punctuation = new Set([".", ",", "!", "?", ":", ";", "'", '"', "-", "(", ")"])
const shiftRequired = new Set(["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "{", "}", "|", ":", '"', "<", ">", "?"])

function getTypewriterDelay(
  fullText: string,
  currentText: string,
  interval: number,
  variance: number | "natural",
  backspaceFactor: number
): number {
  if (needsBackspace(currentText, fullText)) return interval * backspaceFactor
  if (variance === "natural") return getNaturalDelay(fullText, currentText, interval)
  if (typeof variance === "number" && variance > 0) {
    const v = interval * (variance / 100)
    return interval + mix(-v, v, Math.random())
  }
  return interval
}

function getNaturalDelay(fullText: string, currentText: string, interval: number) {
  const idx = currentText.length
  const char = fullText[idx]
  const prev = fullText[idx - 1]
  if (!char) return interval

  const before = fullText.slice(0, idx)
  const lastSpace = before.lastIndexOf(" ")
  const posInWord = idx - lastSpace - 1
  const wordStart = lastSpace + 1
  const after = fullText.slice(idx)
  const nextSpace = after.indexOf(" ")
  const wordEnd = nextSpace === -1 ? fullText.length : idx + nextSpace
  const wordLen = wordEnd - wordStart

  let m = 1.0
  if (prev && /[.!?]/.test(prev) && char === " ") m *= 3
  if (wordLen <= 3) {
    m *= 0.7
  } else {
    if (posInWord === 0 && char !== " ") m *= 1.5
    if (posInWord === wordLen - 1) m *= 1.4
  }
  if (posInWord > 0 && posInWord < wordLen - 1 && wordLen > 3) {
    m *= 1.0 - Math.min(posInWord / wordLen, 0.4)
  }
  if (punctuation.has(char)) m *= 1.5
  if (shiftRequired.has(char)) m *= 1.5
  if (/\d/.test(char)) m *= 1.3
  if (wordLen > 8) m *= 1.3
  if (char !== char.toLowerCase()) m *= 1.25
  if (idx > 200) m *= 1.0 + Math.min((idx - 200) / 1000, 0.3)
  m *= 1.0 + mix(-0.25, 0.25, Math.random())
  return Math.max(interval * 0.2, interval * m)
}

/* ─── Types ─── */

const TYPING_SPEEDS = { slow: 130, normal: 75, fast: 30 } as const
type TypingSpeed = keyof typeof TYPING_SPEEDS

export interface TypewriterProps {
  children: string
  speed?: TypingSpeed | number
  variance?: number | "natural"
  play?: boolean
  cursorClassName?: string
  cursorStyle?: React.CSSProperties
  textClassName?: string
  textStyle?: React.CSSProperties
  cursorBlinkDuration?: number
  cursorBlinkRepeat?: number
  onComplete?: () => void
  onChange?: (info: { text: string; character: string; isBackspace: boolean }) => void
  replace?: "all" | "type"
  backspace?: "character" | "word" | "all"
  backspaceFactor?: number
  className?: string
  "aria-label"?: string
}

/* ─── Component ─── */

export function Typewriter({
  children: text = "",
  speed = "normal",
  variance = "natural",
  cursorClassName = "motion-typewriter-cursor",
  cursorStyle,
  cursorBlinkDuration = 0.5,
  cursorBlinkRepeat = Infinity,
  onComplete,
  onChange,
  play = true,
  "aria-label": ariaLabel,
  textClassName,
  textStyle,
  replace = "type",
  backspace = "character",
  backspaceFactor = 0.2,
  className,
}: TypewriterProps) {
  const targetText = useRef(text)
  const displayText = useMotionValue("")
  const cancelDelay = useRef<VoidFunction | null>(null)
  const cursorBlinkAnimation = useRef<AnimationPlaybackControls | null>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  const interval = typeof speed === "number" ? speed : TYPING_SPEEDS[speed]

  const clearDel = () => {
    cancelDelay.current?.()
    cancelDelay.current = null
  }

  const startBlink = () => {
    cursorBlinkAnimation.current = animate(
      cursorRef.current!,
      { opacity: [1, 1, 0, 0] },
      {
        duration: cursorBlinkDuration,
        times: [0, 0.5, 0.5, 1],
        ease: "linear",
        repeat: Math.max(0, cursorBlinkRepeat) * 2,
        repeatType: "reverse",
      }
    )
    cursorBlinkAnimation.current.finished.then(() => {
      cursorBlinkAnimation.current?.cancel()
    })
  }

  useEffect(() => {
    if (replace === "all" && text !== targetText.current) displayText.set("")
    targetText.current = text
  }, [text, replace])

  useEffect(() => {
    if (!play) {
      startBlink()
      clearDel()
      return
    }

    cursorBlinkAnimation.current?.cancel()

    const nextChar = () => {
      const prev = displayText.get()
      const next = getNextText(prev, text, replace, backspace)
      displayText.set(next)
      if (onChange) {
        const isBack = next.length < prev.length
        const character = isBack ? prev.slice(next.length) : next.slice(prev.length)
        onChange({ text: next, character, isBackspace: isBack })
      }
      if (next !== text) scheduleNext()
      else {
        startBlink()
        onComplete?.()
      }
    }

    const scheduleNext = () => {
      cancelDelay.current = delay(
        nextChar,
        getTypewriterDelay(text, displayText.get(), interval, variance, backspaceFactor)
      )
    }

    if (!cancelDelay.current) scheduleNext()
    return clearDel
  }, [play, onComplete, onChange, text, interval, variance, backspaceFactor, backspace])

  return (
    <span className={className} aria-label={ariaLabel || text}>
      <motion.span className={textClassName} style={textStyle}>
        {displayText}
      </motion.span>
      <motion.span
        ref={cursorRef}
        className={cursorClassName}
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          backgroundColor: "currentColor",
          position: "relative",
          top: "0.1em",
          left: "0.2em",
          ...cursorStyle,
        }}
      />
    </span>
  )
}
