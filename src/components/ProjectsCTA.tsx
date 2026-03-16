"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import SectionMarker from "./SectionMarker";

const projects = [
  {
    name: "Gambit",
    subtitle: "AI Chess Betting Platform",
    description:
      "AI agents play ranked chess. Users bet on outcomes. WebSocket streaming, ELO ratings, MCP server for external LLMs.",
    stack: ["TypeScript", "Python", "React", "Express", "FastAPI", "PostgreSQL", "Redis"],
    image: "/projects/gambit.png",
    liveUrl: "https://chess-arena-flax.vercel.app/",
    githubUrl: "https://github.com/30Nomad032000/chess-arena",
    status: "live" as const,
  },
  {
    name: "ResuMCP",
    subtitle: "AI Resume Builder",
    description:
      "AI-powered resume builder. No server, no data collection — everything stays in your browser.",
    stack: ["TypeScript", "Next.js", "WebMCP"],
    image: "/projects/resumcp.png",
    liveUrl: "https://resumcp.vercel.app",
    githubUrl: "https://github.com/30Nomad032000/resumcp",
    status: "live" as const,
  },
  {
    name: "Prakash Duo",
    subtitle: "E-Commerce Store",
    description:
      "Live e-commerce store with Cashfree payments, admin dashboard, and inventory management.",
    stack: ["Next.js", "TypeScript", "Supabase", "Cashfree"],
    image: "/projects/prakashduo.png",
    liveUrl: "https://www.banglesbyprakashduo.store/",
    status: "live" as const,
  },
  {
    name: "Trident Rentals",
    subtitle: "Property Rental Platform",
    description:
      "Property listings with search, booking, and role-based access.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    image: "/projects/tridentrent.png",
    liveUrl: "https://tridentrent.com",
    status: "live" as const,
  },
  {
    name: "ICEAMT",
    subtitle: "Conference Website",
    description:
      "Official site for the ICEAMT 2027 international conference. Registration, schedule, and speaker profiles.",
    stack: ["TypeScript", "Next.js", "React"],
    image: "/projects/iceamt.png",
    liveUrl: "https://iceamt.vercel.app",
    githubUrl: "https://github.com/30Nomad032000/iceamt",
    status: "live" as const,
  },
  {
    name: "ASIET MCA",
    subtitle: "Course Materials Explorer",
    description:
      "File explorer for MCA course materials — notes, assignments, question papers across 4 semesters. Folder tree sidebar, grid/list views.",
    stack: ["TypeScript", "React", "Tailwind CSS", "Vite"],
    image: "/projects/asiet-mca.png",
    liveUrl: "https://asiet-mca.github.io/",
    githubUrl: "https://github.com/asiet-mca/asiet-mca.github.io",
    status: "live" as const,
  },
  {
    name: "Logentic",
    subtitle: "Multilingual Voice Assistant",
    description:
      "Voice assistant for 21+ Indian languages. Runs on Raspberry Pi 5.",
    stack: ["Python", "FastAPI", "React", "LangGraph", "Whisper ASR"],
    image: "/projects/logentic.png",
    githubUrl: "https://github.com/30Nomad032000/logentic",
    status: "development" as const,
  },
];

export default function ProjectsCTA() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header-block">
        <SectionMarker current={4} total={7} category="Work" sublabel="Projects" />
        <h2>
          Explore the <span className="accent">Projects.</span>
        </h2>
        <p className="projects-intro">
          What I&apos;ve shipped.
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
