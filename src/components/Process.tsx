"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import {
  GitBranch,
  Database,
  Server,
  Shield,
  Gauge,
  Activity,
  Cpu,
  BarChart3,
  Terminal,
  Rocket,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";
import SectionMarker from "./SectionMarker";
import StatusPill from "./StatusPill";
import { AnimateNumber } from "@/lib/motion-plus/animate-number";

gsap.registerPlugin(ScrollTrigger);

/* ──────── Card 1: Architecture Map ──────── */

const archNodes = [
  { id: "api", label: "API Gateway", Icon: Server, row: 0, col: 0 },
  { id: "auth", label: "Auth", Icon: Shield, row: 0, col: 1 },
  { id: "core", label: "Core Service", Icon: Cpu, row: 0, col: 2 },
  { id: "db", label: "Database", Icon: Database, row: 1, col: 0 },
  { id: "cache", label: "Cache", Icon: Zap, row: 1, col: 1 },
  { id: "queue", label: "Queue", Icon: Activity, row: 1, col: 2 },
];

const archLogs = [
  "$ architect --analyze domain.yml",
  "Parsing domain model...",
  "✓ 4 bounded contexts identified",
  "✓ 12 aggregate roots mapped",
  "✓ Event flows validated",
  "→ Generating service topology...",
];

function ArchitectVisual() {
  const [activeNode, setActiveNode] = useState(0);
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveNode((i) => (i + 1) % archNodes.length);
      setLogIdx((i) => (i + 1) % archLogs.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="proc-viz proc-viz--arch">
      {/* Architecture grid */}
      <div className="proc-arch-grid">
        {archNodes.map((node, i) => (
          <motion.div
            key={node.id}
            className={`proc-arch-node ${i === activeNode ? "proc-arch-node--active" : ""}`}
            style={{ gridRow: node.row + 1, gridColumn: node.col + 1 }}
            animate={{
              opacity: i === activeNode ? 1 : 0.45,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div
              className={`proc-arch-circle ${i === activeNode ? "proc-arch-circle--active" : ""}`}
            >
              <node.Icon size={16} strokeWidth={1.5} />
            </div>
            <span className="proc-arch-label">{node.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Terminal log */}
      <div className="proc-term">
        <div className="proc-term-header">
          <Terminal size={12} strokeWidth={1.5} />
          <span>system analysis</span>
          <StatusPill label="RUNNING" variant="live" pulse />
        </div>
        <div className="proc-term-body">
          {archLogs
            .slice(0, logIdx + 1)
            .slice(-3)
            .map((line, i) => (
              <div
                key={`${logIdx}-${i}`}
                className={`proc-term-line ${
                  line.startsWith("$") ? "proc-term-cmd" : ""
                } ${line.startsWith("✓") ? "proc-term-ok" : ""} ${
                  line.startsWith("→") ? "proc-term-arrow" : ""
                }`}
              >
                {line}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* ──────── Card 2: CI/CD Pipeline ──────── */

const pipelineStages = [
  { label: "Commit", Icon: GitBranch, detail: "3 files changed" },
  { label: "Build", Icon: Terminal, detail: "847 modules" },
  { label: "Test", Icon: Shield, detail: "47/47 passed" },
  { label: "Deploy", Icon: Rocket, detail: "3 pods healthy" },
];

const deployLogs = [
  { env: "production", status: "live", time: "2m 14s", version: "v3.2.1" },
  { env: "staging", status: "live", time: "1m 48s", version: "v3.2.2" },
  { env: "preview", status: "building", time: "0m 32s", version: "v3.3.0-rc" },
  { env: "canary", status: "live", time: "0m 58s", version: "v3.2.1" },
];

const buildLogs = [
  "$ npm run build -- --profile",
  "Compiling 847 modules...",
  "✓ Build completed in 12.4s",
  "✓ 47/47 tests passed",
  "→ Deploying to production...",
  "✓ Health check passed (3/3 pods)",
];

function ImplementVisual() {
  const [activeStage, setActiveStage] = useState(0);
  const [buildIdx, setBuildIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStage((i) => (i + 1) % (pipelineStages.length + 1));
      setBuildIdx((i) => (i + 1) % buildLogs.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="proc-viz proc-viz--impl">
      {/* Pipeline grid */}
      <div className="proc-pipeline-grid">
        {pipelineStages.map((stage, i) => {
          const isDone = i < activeStage;
          const isActive = i === activeStage;
          return (
            <motion.div
              key={stage.label}
              className={`proc-pipe-cell ${isActive ? "proc-pipe-cell--active" : ""} ${isDone ? "proc-pipe-cell--done" : ""}`}
              animate={{ opacity: isActive || isDone ? 1 : 0.4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="proc-pipe-step-num">
                {isDone ? "✓" : `0${i + 1}`}
              </div>
              <div
                className={`proc-pipe-icon ${isActive ? "proc-pipe-icon--active" : ""} ${isDone ? "proc-pipe-icon--done" : ""}`}
              >
                {isDone ? (
                  <CheckCircle2 size={20} strokeWidth={1.5} />
                ) : (
                  <stage.Icon size={20} strokeWidth={1.5} />
                )}
              </div>
              <span className="proc-pipe-label">{stage.label}</span>
              <span className="proc-pipe-detail">{stage.detail}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Deploy table */}
      <div className="proc-deploy-table">
        <div className="proc-dt-header">
          <span>Environment</span>
          <span>Version</span>
          <span>Time</span>
          <span>Status</span>
        </div>
        {deployLogs.map((d) => (
          <div key={d.env} className="proc-dt-row">
            <span className="proc-dt-env">{d.env}</span>
            <span className="proc-dt-ver">{d.version}</span>
            <span className="proc-dt-time">
              <Clock size={11} strokeWidth={1.5} /> {d.time}
            </span>
            <span
              className={`proc-dt-status proc-dt-status--${d.status}`}
            >
              <span className="proc-dt-dot" />
              {d.status}
            </span>
          </div>
        ))}
      </div>

      {/* Build log terminal */}
      <div className="proc-term">
        <div className="proc-term-header">
          <Terminal size={12} strokeWidth={1.5} />
          <span>build output</span>
          <StatusPill label="RUNNING" variant="live" pulse />
        </div>
        <div className="proc-term-body">
          {buildLogs
            .slice(0, buildIdx + 1)
            .slice(-3)
            .map((line, i) => (
              <div
                key={`${buildIdx}-${i}`}
                className={`proc-term-line ${
                  line.startsWith("$") ? "proc-term-cmd" : ""
                } ${line.startsWith("✓") ? "proc-term-ok" : ""} ${
                  line.startsWith("→") ? "proc-term-arrow" : ""
                }`}
              >
                {line}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* ──────── Card 3: Metrics Dashboard ──────── */

const metricCards = [
  { label: "p95 Latency", value: 84, suffix: "ms", icon: Gauge },
  { label: "Throughput", value: 12.4, suffix: "K/s", decimals: 1, icon: BarChart3 },
  { label: "Coverage", value: 94.2, suffix: "%", decimals: 1, icon: Shield },
  { label: "Uptime", value: 99.97, suffix: "%", decimals: 2, icon: Activity },
];

const evolutionLogs = [
  "Performance audit triggered at 03:00 UTC",
  "→ p95 improved 84ms → 71ms (+15%)",
  "→ Memory footprint reduced 340MB → 280MB",
  "✓ 12 regression tests passed",
  "✓ Canary deployment healthy (2/2)",
  "Production rollout complete",
];

function EvolveVisual() {
  const [logLine, setLogLine] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLogLine((i) => (i + 1) % evolutionLogs.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="proc-viz proc-viz--evolve">
      {/* Metrics grid */}
      <div className="proc-metrics-grid">
        {metricCards.map((m) => (
          <div key={m.label} className="proc-metric-card">
            <div className="proc-mc-top">
              <m.icon size={14} strokeWidth={1.5} className="proc-mc-icon" />
              <span className="proc-mc-label">{m.label}</span>
            </div>
            <AnimateNumber
              value={m.value}
              suffix={m.suffix}
              decimals={m.decimals}
              className="proc-mc-value"
            />
          </div>
        ))}
      </div>

      {/* Evolution feed */}
      <div className="proc-evo-feed">
        <div className="proc-evo-header">
          <Activity size={12} strokeWidth={1.5} />
          <span>iteration log</span>
          <StatusPill label="LIVE" variant="live" pulse />
        </div>
        <div className="proc-evo-body">
          <AnimatePresence mode="popLayout">
            {evolutionLogs
              .slice(0, logLine + 1)
              .slice(-4)
              .map((line, i) => (
                <motion.div
                  key={`${logLine}-${i}`}
                  className={`proc-evo-line ${
                    line.startsWith("✓") ? "proc-evo-ok" : ""
                  } ${line.startsWith("→") ? "proc-evo-arrow" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {line}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ──────── Steps config ──────── */

const steps = [
  {
    num: "Step 01 — Architect",
    title: "Map the System",
    description:
      "Before writing a line of code, I decompose the problem into bounded contexts, data flows, and failure modes. Architecture decisions are documented, not improvised.",
    Visual: ArchitectVisual,
  },
  {
    num: "Step 02 — Implement",
    title: "Ship & Observe",
    description:
      "Lean sprints, feature flags, and continuous deployment. Every release is instrumented — metrics, logs, and traces from day one. No black boxes.",
    Visual: ImplementVisual,
  },
  {
    num: "Step 03 — Evolve",
    title: "Iterate with Data",
    description:
      "Performance audits, user telemetry, and automated regression tests shape the next cycle. Systems get smarter with every deployment.",
    Visual: EvolveVisual,
  },
];

/* ──────── Main Section ──────── */

export default function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll<HTMLElement>(".process-card");
    wrapper.style.height = `${cards.length * 100}vh`;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: `+=${window.innerHeight}`,
            onUpdate: (self) => {
              const inner = card.querySelector<HTMLElement>(".process-card-inner");
              if (!inner) return;
              const p = self.progress;
              inner.style.transform = `scale(${1 - p * 0.08})`;
              inner.style.filter = `blur(${p * 12}px)`;
              inner.style.opacity = String(1 - p * 0.4);
            },
          });
        }
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process" id="process">
      <div className="process-header">
        <SectionMarker current={4} total={7} category="Process" sublabel="How I Work" />
        <h2>How I Work</h2>
      </div>
      <div className="process-cards-wrapper" ref={wrapperRef}>
        {steps.map((step) => (
          <div className="process-card" key={step.num}>
            <div className="process-card-inner">
              <div className="process-card-text">
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="process-card-visual">
                <step.Visual />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
