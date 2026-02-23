import { ASCII_ART } from "@/lib/ascii-art";
import SectionMarker from "./SectionMarker";

export default function Footer() {
  return (
    <footer className="site-footer">
      <pre className="footer-ascii" aria-hidden="true">
        {ASCII_ART}
      </pre>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="fb-name">Ebin John Joseph</div>
          <div className="fb-tagline">
            Full-stack engineer building production systems — scalable backends,
            modern frontends, and everything between.
          </div>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <a href="#hero">Home</a>
          <a href="#features">Expertise</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#process">Process</a>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <a
            href="https://github.com/30Nomad032000"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ebin-j/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:ebin.john76@gmail.com">Email</a>
        </div>
        <div className="footer-col">
          <h4>Projects</h4>
          <a
            href="https://www.banglesbyprakashduo.store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prakash Duo Store
          </a>
          <a
            href="https://tridentrent.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trident Rentals
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <SectionMarker current={7} total={7} category="End" sublabel="Footer" />
        </div>
        <span>&copy; 2026 Ebin John Joseph. All rights reserved.</span>
        <div className="footer-status">
          <div className="status-dot status-dot--green" />
          <span>System Operational</span>
        </div>
      </div>
    </footer>
  );
}
