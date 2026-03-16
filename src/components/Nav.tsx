"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import StatusPill from "./StatusPill";

const NAV_ITEMS = [
  { label: "Expertise", id: "features" },
  { label: "Process", id: "process" },
  { label: "Projects", id: "projects" },
  { label: "Writing", id: "writing" },
];

export default function Nav() {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Body scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <>
      <nav className={`navbar ${atTop ? "at-top" : "scrolled"}`}>
        <div className="logo-group">
          <div className="logo">EJ</div>
          <StatusPill label="v1.0" />
        </div>
        <div className="nav-links">
          <a href="#features">Expertise</a>
          <a href="#process">Process</a>
          <a href="#projects">Projects</a>
          <a href="#writing">Writing</a>
        </div>
        <div className="nav-actions">
          {!atTop && <StatusPill label="200 OK" variant="success" />}
          <ThemeToggle />
          <button className="nav-cta nav-cta-desktop" onClick={() => scrollTo("projects")}>
            Explore Work &rarr;
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`hamburger-line ${menuOpen ? "hamburger-open" : ""}`} />
            <span className={`hamburger-line ${menuOpen ? "hamburger-open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="mobile-menu-inner">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              className="mobile-menu-link"
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
              onClick={() => scrollTo(item.id)}
            >
              <span className="mobile-menu-prompt">$</span>
              <span className="mobile-menu-cmd">{item.label.toLowerCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
