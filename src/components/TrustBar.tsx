"use client";

import {
  Atom,
  Server,
  Database,
  Container,
  Triangle,
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
  { name: "TypeScript", Icon: Code },
  { name: "Python", Icon: Code },
  { name: "Node.js", Icon: Server },
  { name: "Express", Icon: Server },
  { name: "FastAPI", Icon: Zap },
  { name: "PostgreSQL", Icon: Database },
  { name: "Redis", Icon: Database },
  { name: "Docker", Icon: Container },
  { name: "Supabase", Icon: Cloud },
  { name: "Vercel", Icon: Triangle },
];

export default function TrustBar() {
  const items = [...TECH, ...TECH];

  return (
    <section className="trust-bar">
      <div className="trust-bar-inner">
        {/* Fixed label cell */}
        <div className="trust-bar-label-cell">
          <span className="trust-bar-label-text">
            Current
            <br />
            <span className="trust-bar-label-accent">Stack</span>
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
