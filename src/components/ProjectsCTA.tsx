"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import SectionMarker from "./SectionMarker";

const projects = [
  {
    name: "Gambit",
    subtitle: "AI Chess Betting Platform",
    description:
      "Polyglot microservices — AI agents compete on a ranked ELO ladder with real-time streaming via WebSocket, dynamic odds engine with auto-settlement, and MCP server enabling external LLMs to join as players.",
    stack: ["TypeScript", "Python", "React", "Express", "FastAPI", "PostgreSQL", "Redis", "WebSocket"],
    image: "/projects/gambit.png",
    liveUrl: "https://chess-arena-flax.vercel.app/",
    githubUrl: "https://github.com/30Nomad032000/chess-arena",
    status: "live" as const,
  },
  {
    name: "Prakash Duo",
    subtitle: "E-Commerce Platform",
    description:
      "Complete e-commerce system with Cashfree payment gateway, admin dashboard with inventory management, real-time Supabase subscriptions, and automated Zoho SMTP notifications.",
    stack: ["Next.js", "TypeScript", "Supabase", "Cashfree", "Tailwind CSS"],
    image: "/projects/prakashduo.png",
    liveUrl: "https://www.banglesbyprakashduo.store/",
    status: "live" as const,
  },
  {
    name: "Trident Rentals",
    subtitle: "Property Rental Platform",
    description:
      "Full-stack property rental application with listing management, advanced search and filtering, booking workflows, and role-based access.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    image: "/projects/tridentrent.png",
    liveUrl: "https://tridentrent.com",
    status: "live" as const,
  },
  {
    name: "Logentic",
    subtitle: "Multilingual Voice Assistant · Edge AI",
    description:
      "Hyper-localized voice assistant supporting 21+ Indian languages. LangGraph multi-step agent workflows, OpenAI Whisper speech recognition, optimized for Raspberry Pi 5 edge inference.",
    stack: ["Python", "FastAPI", "React", "LangGraph", "Whisper ASR", "RPi 5"],
    image: "/projects/logentic.png",
    githubUrl: "https://github.com/30Nomad032000/logentic",
    status: "development" as const,
  },
];

export default function ProjectsCTA() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header-block">
        <SectionMarker current={5} total={7} category="Work" sublabel="Projects" />
        <h2>
          Explore the <span className="accent">Projects.</span>
        </h2>
        <p className="projects-intro">
          From AI chess platforms and multi-tenant SaaS to edge computing —
          built with React, Next.js, Django, Express, FastAPI, and PostgreSQL.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => {
          const primaryUrl = project.liveUrl || project.githubUrl || "#";
          const hostname = project.liveUrl
            ? new URL(project.liveUrl).hostname.replace("www.", "")
            : project.githubUrl
            ? new URL(project.githubUrl).hostname + new URL(project.githubUrl).pathname
            : "";

          return (
            <article key={project.name} className="project-card">
              {/* Browser frame */}
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-browser"
              >
                <div className="project-browser-bar">
                  <div className="browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="browser-url">{hostname}</div>
                  <div className="browser-status">
                    <span
                      className={`proj-status-dot proj-status-dot--${project.status === "live" ? "green" : "yellow"}`}
                    />
                    <span className="proj-status-text">
                      {project.status === "live" ? "LIVE" : "DEV"}
                    </span>
                  </div>
                </div>
                <div className="project-preview">
                  <Image
                    src={project.image}
                    alt={`${project.name} — ${project.subtitle}`}
                    width={1280}
                    height={800}
                    className="project-preview-img"
                    unoptimized
                  />
                </div>
              </a>

              {/* Project info */}
              <div className="project-info">
                <div className="project-name-row">
                  <h3 className="project-title">{project.name}</h3>
                  <span className="project-divider">/</span>
                  <span className="project-subtitle">{project.subtitle}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="stack-pill">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link--primary"
                    >
                      <ExternalLink size={13} strokeWidth={1.8} />
                      Visit Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Github size={13} strokeWidth={1.8} />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="projects-footer-cta">
        <a
          href="https://github.com/30Nomad032000"
          target="_blank"
          rel="noopener noreferrer"
          className="projects-cta-btn"
        >
          View all on GitHub <span className="arrow">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
