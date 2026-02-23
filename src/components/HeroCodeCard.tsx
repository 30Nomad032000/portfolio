"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import {
  Atom,
  Zap,
  FileCode2,
  Server,
  Brain,
  Route,
  Container,
  Database,
  Cpu,
} from "lucide-react"
import StatusPill from "./StatusPill"

const techNodes = [
  { id: "react",    label: "React",      Icon: Atom,      row: 0, col: 0 },
  { id: "next",     label: "Next.js",    Icon: Zap,       row: 0, col: 1 },
  { id: "ts",       label: "TypeScript", Icon: FileCode2,  row: 0, col: 2 },
  { id: "node",     label: "Node.js",    Icon: Server,    row: 1, col: 0 },
  { id: "python",   label: "Python",     Icon: Brain,     row: 1, col: 1 },
  { id: "express",  label: "Express",    Icon: Route,     row: 1, col: 2 },
  { id: "docker",   label: "Docker",     Icon: Container, row: 2, col: 0 },
  { id: "postgres", label: "Postgres",   Icon: Database,  row: 2, col: 1 },
  { id: "redis",    label: "Redis",      Icon: Cpu,       row: 2, col: 2 },
]

const tierLabels = ["Frontend", "Backend", "Infra"]

const statusMessages: Record<string, string> = {
  react:    "UI rendered — 16ms",
  next:     "ISR cached — 42ms TTL",
  ts:       "847 modules type-safe",
  node:     "Event loop — 2.1ms avg",
  python:   "Pipeline — 340 records/s",
  express:  "Routed — p95 84ms",
  docker:   "3 pods healthy — 127MB",
  postgres: "Query — 4.2ms avg",
  redis:    "Cache hit — 97.3%",
}

export default function HeroCodeCard() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % techNodes.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  const active = techNodes[activeIdx]

  return (
    <motion.div
      className="hero-constellation"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="hc-header">
        <span className="hc-title">System Architecture</span>
        <StatusPill label="LIVE" variant="live" pulse />
      </div>

      {/* Grid body */}
      <div className="hc-body">
        {/* Tier row labels */}
        <div className="hc-tier-col" aria-hidden="true">
          {tierLabels.map((label, i) => (
            <div
              key={label}
              className={`hc-tier-label ${active.row === i ? "hc-tier-label--active" : ""}`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* 3×3 Tech grid */}
        <div className="hc-grid">
          {techNodes.map((node, i) => {
            const isActive = i === activeIdx
            const isRowMatch = node.row === active.row
            const isColMatch = node.col === active.col
            const isNeighbor = (isRowMatch || isColMatch) && !isActive
            return (
              <motion.div
                key={node.id}
                className={`hc-cell ${isActive ? "hc-cell--active" : ""} ${isNeighbor ? "hc-cell--neighbor" : ""}`}
                style={{ gridRow: node.row + 1, gridColumn: node.col + 1 }}
                animate={{ opacity: isActive ? 1 : isNeighbor ? 0.7 : 0.4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className={`hc-cell-icon ${isActive ? "hc-cell-icon--active" : ""}`}>
                  <node.Icon size={22} strokeWidth={1.5} />
                </div>
                <span className="hc-cell-label">{node.label}</span>
              </motion.div>
            )
          })}

          {/* Grid intersection dots — 4 points where internal lines cross */}
          {[
            { row: 1, col: 1 }, // between cells (0,0)-(0,1)-(1,0)-(1,1)
            { row: 1, col: 2 }, // between cells (0,1)-(0,2)-(1,1)-(1,2)
            { row: 2, col: 1 }, // between cells (1,0)-(1,1)-(2,0)-(2,1)
            { row: 2, col: 2 }, // between cells (1,1)-(1,2)-(2,1)-(2,2)
          ].map((pt) => {
            // Intersection is "hot" if the active cell touches this corner
            const isHot =
              (active.row === pt.row - 1 || active.row === pt.row) &&
              (active.col === pt.col - 1 || active.col === pt.col)
            return (
              <div
                key={`ix-${pt.row}-${pt.col}`}
                className={`hc-intersection ${isHot ? "hc-intersection--hot" : ""}`}
                style={{
                  gridRow: pt.row,
                  gridColumn: pt.col,
                  alignSelf: "end",
                  justifySelf: "end",
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Status bar */}
      <div className="hc-status">
        <span className="hc-status-dot" />
        <span className="hc-status-text" key={active.id}>
          {active.label}: {statusMessages[active.id]}
        </span>
      </div>
    </motion.div>
  )
}
