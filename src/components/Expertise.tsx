"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionMarker from "./SectionMarker";
import StatusPill from "./StatusPill";
import { Typewriter } from "@/lib/motion-plus/typewriter";
import { AnimateNumber } from "@/lib/motion-plus/animate-number";

const shufflerData = [
  { id: "frontend", label: "Frontend", title: "React · TypeScript · Next.js · Tailwind", barWidth: "92%" },
  { id: "backend", label: "Backend", title: "Node.js · Django · Express · PostgreSQL", barWidth: "88%" },
  { id: "devops", label: "DevOps", title: "Docker · AWS · Vercel · CI/CD", barWidth: "78%" },
];

const expertiseTabs = ["Full-Stack", "AI/ML", "DevOps"] as const;

const typewriterMessages = [
  "Training neural network on 2.4M samples...",
  "Accuracy: 97.3% — loss converging at epoch 42",
  "Model exported to ONNX — inference ready",
  "Pipeline processing 12.4K requests/sec",
  "Anomaly detected — auto-scaling triggered",
];

const codeSnippet = `const handler = async (req) => {
  const data = await db.query(
    \`SELECT * FROM users
     WHERE active = true\`
  );
  return Response.json(data);
};`;

/* ───── Card enter/exit variants ───── */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

/* ───── Shuffler Card ───── */
function ShufflerCard() {
  const [order, setOrder] = useState([0, 1, 2]);

  useEffect(() => {
    const id = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="feature-card feature-card--wide"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="feature-card-main">
        <div className="feature-card-header">
          <h3>Full-Stack Web Development</h3>
          <p>End-to-end product engineering from database to deploy.</p>
        </div>
        <div className="feature-card-body">
          <div className="shuffler-stack">
            {order.map((idx, pos) => {
              const d = shufflerData[idx];
              return (
                <motion.div
                  key={d.id}
                  className="shuffler-item"
                  animate={{
                    y: pos * 30 + 10,
                    scale: 1 - pos * 0.04,
                    opacity: 1 - pos * 0.2,
                    zIndex: 3 - pos,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                    mass: 0.8,
                  }}
                >
                  <div className="si-label">{d.label}</div>
                  <div className="si-title">{d.title}</div>
                  <div className="si-bar" style={{ width: d.barWidth }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="feature-card-side">
        <div className="mini-terminal">
          <div className="mini-terminal-header">
            <StatusPill label=".TSX" />
          </div>
          <pre className="mini-terminal-code">{codeSnippet}</pre>
        </div>
      </div>
    </motion.div>
  );
}

/* ───── Typewriter Card ───── */
function TypewriterCardNew() {
  const [msgIdx, setMsgIdx] = useState(0);

  return (
    <motion.div
      className="feature-card feature-card--wide"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="feature-card-main">
        <div className="feature-card-header">
          <h3>AI &amp; Machine Learning</h3>
          <p>Model training, inference pipelines, and intelligent automation.</p>
        </div>
        <div className="feature-card-body">
          <div className="typewriter-container">
            <div className="tw-header">
              <div className="tw-dot" />
              <span>Live Feed</span>
              <StatusPill label="LIVE" variant="live" pulse />
            </div>
            <div className="tw-body">
              <Typewriter
                speed="fast"
                variance="natural"
                replace="type"
                backspace="all"
                onComplete={() => {
                  setTimeout(() => {
                    setMsgIdx((i) => (i + 1) % typewriterMessages.length);
                  }, 2500);
                }}
              >
                {typewriterMessages[msgIdx]}
              </Typewriter>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-card-side">
        <div className="metrics-panel">
          <div className="metric-row">
            <span className="metric-label">Accuracy</span>
            <AnimateNumber value={97.3} suffix="%" decimals={1} className="metric-value" />
          </div>
          <div className="metric-row">
            <span className="metric-label">Latency</span>
            <AnimateNumber value={12} suffix="ms" className="metric-value" />
          </div>
          <div className="metric-row">
            <span className="metric-label">Uptime</span>
            <AnimateNumber value={99.97} suffix="%" decimals={2} className="metric-value" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───── DevOps Grid Orchestration Card ───── */
import {
  Container,
  Cloud,
  GitBranch,
  Shield,
  Activity,
  Gauge,
} from "lucide-react";

/* Satellite tools around the center */
const satellites = [
  { Icon: GitBranch, row: 0, col: 0, label: "Git" },
  { Icon: Cloud, row: 0, col: 2, label: "AWS" },
  { Icon: Shield, row: 2, col: 0, label: "CI/CD" },
  { Icon: Gauge, row: 2, col: 2, label: "Monitor" },
];

/* Messages that orbit the center */
const orbitMessages = [
  "Building image...",
  "Running 47 tests...",
  "Deploying v3.2.1",
  "Health check ✓",
  "Scaling to 3 pods",
];

/* Orbit positions: top, right, bottom, left relative to center */
const orbitPositions = [
  { x: 0, y: -68 },   // top
  { x: 90, y: 0 },    // right
  { x: 0, y: 68 },    // bottom
  { x: -90, y: 0 },   // left
  { x: 90, y: -68 },  // top-right
];

function DevOpsCard() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [activeSat, setActiveSat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % orbitMessages.length);
      setActiveSat((i) => (i + 1) % satellites.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="feature-card feature-card--devops"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="devops-text">
        <div className="feature-card-header">
          <h3>DevOps &amp; Cloud</h3>
          <p>Docker, Kubernetes, AWS — containerized deploys at scale.</p>
        </div>
      </div>

      <div className="devops-grid-area">
        {/* Background grid lines */}
        <div className="dg-grid" aria-hidden="true">
          <div className="dg-line dg-line--h dg-line--h1" />
          <div className="dg-line dg-line--h dg-line--h2" />
          <div className="dg-line dg-line--h dg-line--h3" />
          <div className="dg-line dg-line--v dg-line--v1" />
          <div className="dg-line dg-line--v dg-line--v2" />
          <div className="dg-line dg-line--v dg-line--v3" />
        </div>

        {/* Scatter particles */}
        <div className="dg-particles" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => {
            // Inner ring (first 12): tight cluster around center
            // Outer ring (last 8): wider spread
            const isInner = i < 12;
            const spread = isInner ? 18 : 36;
            const left = 50 + (Math.random() - 0.5) * spread;
            const top = 50 + (Math.random() - 0.5) * spread;
            return (
              <span
                key={i}
                className="dg-particle"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${i * 0.12}s`,
                  animationDuration: `${1.8 + Math.random() * 2.2}s`,
                }}
              />
            );
          })}
        </div>

        {/* Satellite icons in grid cells */}
        {satellites.map((sat, i) => (
          <motion.div
            key={sat.label}
            className="dg-satellite"
            style={{
              gridRow: sat.row + 1,
              gridColumn: sat.col + 1,
            }}
            animate={{
              opacity: i === activeSat ? 1 : 0.35,
              scale: i === activeSat ? 1.18 : 0.95,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div className={`dg-sat-circle ${i === activeSat ? "dg-sat-circle--active" : ""}`}>
              <sat.Icon size={18} strokeWidth={1.5} />
            </div>
          </motion.div>
        ))}

        {/* Center icon — Docker container */}
        <div className="dg-center">
          <div className="dg-center-ring" />
          <div className="dg-center-icon">
            <Container size={28} strokeWidth={1.5} />
          </div>
          <div className="dg-center-pulse" />
          <div className="dg-center-pulse dg-center-pulse--slow" />
        </div>

        {/* Orbiting status pill */}
        <motion.div
          className="dg-orbit-pill"
          animate={{
            x: orbitPositions[msgIdx].x,
            y: orbitPositions[msgIdx].y,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 0.8,
          }}
        >
          <Activity size={12} strokeWidth={2} className="dg-pill-icon" />
          <span>{orbitMessages[msgIdx]}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ───── Tab Switcher ───── */
function TabSwitcher({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="expertise-tabs">
      {expertiseTabs.map((tab) => (
        <button
          key={tab}
          className={`expertise-tab ${active === tab ? "expertise-tab--active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* ───── Main Expertise Section ───── */
export default function Expertise() {
  const [activeTab, setActiveTab] = useState<string>("Full-Stack");

  return (
    <section className="features" id="features">
      <div className="features-header">
        <SectionMarker current={2} total={7} category="Core Expertise" sublabel="Developer First" />
        <h2>What I Build</h2>
        <TabSwitcher active={activeTab} onChange={setActiveTab} />
      </div>
      <div className="features-grid features-grid--stacked">
        <AnimatePresence mode="wait">
          {activeTab === "Full-Stack" && <ShufflerCard key="fullstack" />}
          {activeTab === "AI/ML" && <TypewriterCardNew key="aiml" />}
          {activeTab === "DevOps" && <DevOpsCard key="devops" />}
        </AnimatePresence>
      </div>
    </section>
  );
}
