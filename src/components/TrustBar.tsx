"use client";

import {
  Atom,
  Server,
  Database,
  Container,
  Train,
  Triangle,
  Brain,
  Sparkles,
  Box,
  Wind,
  Layers,
  Cloud,
  Zap,
  Code,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TechItem = {
  name: string;
  Icon: LucideIcon;
};

const TECH: TechItem[] = [
  { name: "React", Icon: Atom },
  { name: "Next.js", Icon: Triangle },
  { name: "Python", Icon: Code },
  { name: "Node.js", Icon: Server },
  { name: "PostgreSQL", Icon: Database },
  { name: "Docker", Icon: Container },
  { name: "Railway", Icon: Train },
  { name: "Vercel", Icon: Triangle },
  { name: "TensorFlow", Icon: Brain },
  { name: "GSAP", Icon: Sparkles },
  { name: "Three.js", Icon: Box },
  { name: "Tailwind", Icon: Wind },
  { name: "Redis", Icon: Zap },
  { name: "AWS", Icon: Cloud },
  { name: "Motion", Icon: Layers },
];

export default function TrustBar() {
  const items = [...TECH, ...TECH];

  return (
    <section className="trust-bar">
      <div className="trust-bar-inner">
        {/* Fixed label cell */}
        <div className="trust-bar-label-cell">
          <span className="trust-bar-label-text">
            Built with <span className="trust-bar-label-accent">{TECH.length}+</span>
            <br />
            technologies
          </span>
        </div>

        {/* Scrolling track */}
        <div className="trust-bar-track">
          <div className="trust-bar-scroll">
            {items.map((t, i) => (
              <div key={i} className="trust-bar-cell">
                <t.Icon size={20} strokeWidth={1.5} className="trust-bar-icon" />
                <span className="trust-bar-name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
