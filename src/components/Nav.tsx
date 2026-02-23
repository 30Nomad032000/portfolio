"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import StatusPill from "./StatusPill";

export default function Nav() {
  const [atTop, setAtTop] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroRef.current = document.getElementById("hero");
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtTop(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${atTop ? "at-top" : "scrolled"}`}>
      <div className="logo-group">
        <div className="logo">EJ</div>
        <StatusPill label="v1.0" />
      </div>
      <div className="nav-links">
        <a href="#features">Expertise</a>
        <a href="#philosophy">Philosophy</a>
        <a href="#process">Process</a>
      </div>
      <div className="nav-actions">
        {!atTop && <StatusPill label="200 OK" variant="success" />}
        <ThemeToggle />
        <button className="nav-cta" onClick={() => scrollTo("projects")}>
          Explore Work &rarr;
        </button>
      </div>
    </nav>
  );
}
