"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleText, stagger } from "@/lib/motion-plus/scramble-text";
import HeroCodeCard from "./HeroCodeCard";
import FlickeringGrid from "./FlickeringGrid";
import { useTheme } from "./ThemeProvider";

const SCRAMBLE_DURATION = stagger(0.06, { from: "center" });
const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:,./<>?";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrambleActive, setScrambleActive] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          onComplete: () => setScrambleActive(true),
        },
        0.3
      )
        .fromTo(
          ".hero-line1",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.5
        )
        .fromTo(
          ".hero-line2",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          0.7
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          1
        )
        .fromTo(
          ".hero-cta-btn",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.2
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Flickering grid — the only background texture */}
      <FlickeringGrid
        key={theme}
        squareSize={3}
        gridGap={6}
        flickerChance={0.15}
        color={isDark ? "rgb(230, 59, 46)" : "rgb(17, 17, 17)"}
        maxOpacity={isDark ? 0.12 : 0.06}
      />

      {/* Gradient overlay for text readability */}
      <div className="hero-gradient" />

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-label">
            <ScrambleText
              active={scrambleActive}
              duration={SCRAMBLE_DURATION}
              interval={0.04}
              chars={SCRAMBLE_CHARS}
            >
              Developer · Engineer · Builder
            </ScrambleText>
          </div>
          <div className="hero-line1">Build the</div>
          <div className="hero-line2">
            <span className="accent">System.</span>
          </div>
          <p className="hero-sub">
            Full-stack engineer crafting production systems — from multi-tenant
            web apps and scalable backends to high-performance interfaces that
            people actually use.
          </p>
          <a href="#projects" className="hero-cta-btn">
            Explore Projects &darr;
          </a>
        </div>
        <div className="hero-card-col">
          <HeroCodeCard />
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
