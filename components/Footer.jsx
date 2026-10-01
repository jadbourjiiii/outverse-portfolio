import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="#" aria-label="Outverse home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/outverse-logo-white.png" alt="Outverse" />
            </Link>
            <p>We build digital products and teach people how to build them. Studio, academy and launchpad — one ecosystem.</p>
          </div>
          <div>
            <h4>Company</h4>
            <div className="links">
              <Link href="#studio">Studio</Link>
              <Link href="#academy">Academy</Link>
              <Link href="#launchpad">Launchpad</Link>
              <Link href="#work">Work</Link>
            </div>
          </div>
          <div>
            <h4>Courses</h4>
            <div className="links">
              <Link href="#courses">React Foundations</Link>
              <Link href="#courses">Next.js Mastery</Link>
              <Link href="#courses">Full-Stack Launchpad</Link>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div className="links">
              <Link href="mailto:hello@outverse.dev">hello@outverse.dev</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">Instagram</Link>
              <Link href="#">X / Twitter</Link>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Outverse. All rights reserved.</span>
          <span>Made with React &amp; Next.js — obviously.</span>
        </div>
      </div>
    </footer>
  );
}