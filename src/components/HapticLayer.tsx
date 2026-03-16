"use client";

import { useEffect, useRef } from "react";

type Preset = "success" | "nudge" | "error" | "buzz";

const CLICK_MAP: [string, Preset][] = [
  [".nav-cta", "success"],
  [".hero-cta-btn", "success"],
  [".projects-cta-btn", "success"],
  [".blog-cta-btn", "success"],
  [".project-link--primary", "success"],
  [".theme-toggle", "nudge"],
  [".expertise-tab", "nudge"],
  [".connect-line", "nudge"],
  [".blog-card", "nudge"],
  [".project-card a", "nudge"],
  [".project-link", "nudge"],
  [".nav-links a", "nudge"],
  [".cmd-item", "nudge"],
  [".mobile-menu-link", "nudge"],
];

function isMobile(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function HapticLayer() {
  const haptics = useRef<any>(null);

  useEffect(() => {
    if (!isMobile()) return;

    let cleanup: (() => void) | undefined;

    import("web-haptics").then(({ WebHaptics }) => {
      haptics.current = new WebHaptics();

      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        for (const [selector, preset] of CLICK_MAP) {
          if (target.closest(selector)) {
            haptics.current?.trigger(preset);
            return;
          }
        }
      };

      document.addEventListener("click", onClick, { passive: true });
      cleanup = () => document.removeEventListener("click", onClick);
    });

    return () => {
      cleanup?.();
      haptics.current?.destroy();
    };
  }, []);

  return null;
}
