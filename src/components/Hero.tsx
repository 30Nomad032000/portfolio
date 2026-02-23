"use client";

import { useEffect, useState } from "react";
import { ScrambleText, stagger } from "@/lib/motion-plus/scramble-text";
import FlickeringGrid from "./FlickeringGrid";
import { useTheme } from "./ThemeProvider";
import dynamic from "next/dynamic";

const HeroCodeCard = dynamic(() => import("./HeroCodeCard"), { ssr: false });

const SCRAMBLE_DURATION = stagger(0.06, { from: "center" });
const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:,./<>?";

export default function Hero() {
  const [scrambleActive, setScrambleActive] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Trigger scramble after CSS entrance animation completes (0.3s delay + 0.8s duration)
  useEffect(() => {
    const timer = setTimeout(() => setScrambleActive(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <FlickeringGrid
        squareSize={3}
        gridGap={6}
        flickerChance={0.15}
        color={isDark ? "rgb(230, 59, 46)" : "rgb(17, 17, 17)"}
        maxOpacity={isDark ? 0.12 : 0.06}
      />

      <div className="hero-gradient" />

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-label hero-reveal" style={{ animationDelay: "0.3s" }}>
            <ScrambleText
              active={scrambleActive}
              duration={SCRAMBLE_DURATION}
              interval={0.04}
              chars={SCRAMBLE_CHARS}
            >
              Developer · Engineer · Builder
            </ScrambleText>
          </div>
          <div className="hero-line1 hero-reveal" style={{ animationDelay: "0.5s" }}>Build the</div>
          <div className="hero-line2 hero-reveal" style={{ animationDelay: "0.7s" }}>
            <span className="accent">System.</span>
          </div>
          <p className="hero-sub hero-reveal" style={{ animationDelay: "1s" }}>
            Full-stack engineer crafting production systems — from multi-tenant
            web apps and scalable backends to high-performance interfaces that
            people actually use.
          </p>
          <a href="#projects" className="hero-cta-btn hero-reveal" style={{ animationDelay: "1.2s" }}>
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
