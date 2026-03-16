"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Command {
  id: string;
  label: string;
  section: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggleTheme } = useTheme();

  const [sudoResponse, setSudoResponse] = useState<string | null>(null);

  const sudoReplies = [
    "Nice try. Root access denied.",
    "Permission denied. Have you tried turning it off and on again?",
    "sudo: ebin is not in the sudoers file. This incident will be reported.",
    "You're not root. You're not even close.",
    "Access denied. Try asking nicely.",
  ];

  const commands: Command[] = [
    { id: "home", label: "Go to Home", section: "Navigate", action: () => scrollToId("hero") },
    { id: "expertise", label: "Go to Expertise", section: "Navigate", action: () => scrollToId("features") },
    { id: "process", label: "Go to Process", section: "Navigate", action: () => scrollToId("process") },
    { id: "projects", label: "Go to Projects", section: "Navigate", action: () => scrollToId("projects") },
    { id: "writing", label: "Go to Writing", section: "Navigate", action: () => scrollToId("writing") },
    { id: "blog", label: "Open Blog", section: "Navigate", action: () => { window.location.href = "/blog"; } },
    { id: "theme", label: "Toggle Theme", section: "Actions", action: () => { toggleTheme(window.innerWidth / 2, window.innerHeight / 2); } },
    { id: "github", label: "Open GitHub", section: "Links", action: () => { window.open("https://github.com/30Nomad032000", "_blank"); } },
    { id: "linkedin", label: "Open LinkedIn", section: "Links", action: () => { window.open("https://www.linkedin.com/in/ebin-j/", "_blank"); } },
    { id: "email", label: "Send Email", section: "Links", action: () => { window.location.href = "mailto:ebin.john76@gmail.com"; } },
  ];

  const isSudo = query.toLowerCase().startsWith("sudo");

  const filtered = isSudo
    ? []
    : query
      ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
      : commands;

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const execute = useCallback(
    (cmd: Command) => {
      setOpen(false);
      setQuery("");
      setActive(0);
      setTimeout(() => cmd.action(), 100);
    },
    []
  );

  // Open/close on Ctrl+K / Cmd+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setActive(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setActive(0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Reset active index and sudo response on filter change
  useEffect(() => {
    setActive(0);
    setSudoResponse(null);
  }, [query]);

  // Keyboard navigation inside palette
  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && isSudo) {
      e.preventDefault();
      setSudoResponse(sudoReplies[Math.floor(Math.random() * sudoReplies.length)]);
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      execute(filtered[active]);
    }
  };

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  // Group by section
  const sections = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    (acc[cmd.section] ??= []).push(cmd);
    return acc;
  }, {});

  let globalIndex = 0;

  return (
    <div className="cmd-backdrop" onClick={() => { setOpen(false); setQuery(""); }}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-row">
          <span className="cmd-prompt">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            spellCheck={false}
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>
        <div className="cmd-list">
          {Object.entries(sections).map(([section, cmds]) => (
            <div key={section} className="cmd-section">
              <div className="cmd-section-label">{section}</div>
              {cmds.map((cmd) => {
                const idx = globalIndex++;
                return (
                  <button
                    key={cmd.id}
                    className={`cmd-item ${idx === active ? "cmd-item--active" : ""}`}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => execute(cmd)}
                  >
                    {cmd.label}
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && isSudo && sudoResponse && (
            <div className="cmd-empty cmd-sudo">{sudoResponse}</div>
          )}
          {filtered.length === 0 && isSudo && !sudoResponse && (
            <div className="cmd-empty">Press Enter to run...</div>
          )}
          {filtered.length === 0 && !isSudo && (
            <div className="cmd-empty">No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
