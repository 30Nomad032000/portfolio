"use client"

import SectionMarker from "./SectionMarker"

const commands = [
  {
    cmd: "open github.com/30Nomad032000",
    comment: "View my code",
    href: "https://github.com/30Nomad032000",
  },
  {
    cmd: "open linkedin.com/in/ebin-j",
    comment: "Let's connect",
    href: "https://www.linkedin.com/in/ebin-j/",
  },
  {
    cmd: "mail ebin.john76@gmail.com",
    comment: "Say hello",
    href: "mailto:ebin.john76@gmail.com",
  },
]

export default function Connect() {
  return (
    <section className="connect-section" id="connect">
      <div className="connect-inner">
        <SectionMarker
          current={6}
          total={7}
          category="Connect"
          sublabel="Let's Build"
        />
        <h2 className="connect-heading">
          Let&apos;s build something <span className="accent">together.</span>
        </h2>
        <div className="connect-terminal">
          <div className="connect-terminal-header">
            <span className="connect-terminal-dot" />
            <span className="connect-terminal-title">terminal</span>
          </div>
          <div className="connect-terminal-body">
            {commands.map((c) => (
              <a
                key={c.cmd}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="connect-line"
              >
                <span className="connect-prompt">$</span>
                <span className="connect-cmd">{c.cmd}</span>
                <span className="connect-comment"># {c.comment}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
