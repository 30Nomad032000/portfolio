"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionMarker from "./SectionMarker";
import { Typewriter } from "@/lib/motion-plus/typewriter";

gsap.registerPlugin(ScrollTrigger);

const commits = [
  "feat: add real-time WebSocket notifications",
  "fix: resolve race condition in checkout flow",
  "perf: optimize query plan — 3x faster reads",
  "feat: multi-tenant auth with row-level security",
  "chore: migrate to Next.js 16 App Router",
];

export default function ProjectsCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [commitIdx, setCommitIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-inner",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-section", start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-inner">
        <SectionMarker current={5} total={7} category="Work" sublabel="Projects" />
        <h2>
          Explore the <span className="accent">Projects.</span>
        </h2>
        <p>
          From multi-tenant SaaS platforms and e-commerce systems to property
          rental apps — built with React, Next.js, Django, Express, FastAPI,
          Supabase, Stripe, and PostgreSQL.
        </p>

        <div className="repo-card">
          <div className="repo-card-header">
            <span className="repo-name">ebinjoseph/portfolio</span>
            <span className="repo-visibility">Public</span>
          </div>
          <div className="repo-meta">
            <span className="repo-lang">
              <span className="repo-lang-dot" />
              TypeScript
            </span>
            <span className="repo-stat">&#9733; 2.1K</span>
            <span className="repo-stat">&#127860; 340</span>
          </div>
          <div className="repo-commits">
            <span className="repo-commit-icon">&#8250;</span>
            <Typewriter
              speed="fast"
              variance="natural"
              replace="type"
              backspace="all"
              onComplete={() => {
                setTimeout(() => {
                  setCommitIdx((i) => (i + 1) % commits.length);
                }, 3000);
              }}
              textClassName="repo-commit-text"
              cursorStyle={{ backgroundColor: "var(--accent)" }}
            >
              {commits[commitIdx]}
            </Typewriter>
          </div>
        </div>

        <a
          href="https://github.com/30Nomad032000"
          target="_blank"
          rel="noopener noreferrer"
          className="projects-cta-btn"
        >
          View on GitHub <span className="arrow">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
