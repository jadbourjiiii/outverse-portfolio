"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="container nav-inner">
        <Link href="#" className="logo" aria-label="Outverse home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/outverse-mark.png" alt="Outverse" />
          Outverse
        </Link>
        <div className="nav-links">
          <Link href="#studio">Studio</Link>
          <Link href="#academy">Academy</Link>
          <Link href="#launchpad">Launchpad</Link>
          <Link href="#courses">Courses</Link>
          <Link href="#work">Work</Link>
        </div>
        <Link href="#contact" className="btn btn-red nav-cta">Start a project</Link>
        <button className="hamburger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        <Link href="#studio" onClick={() => setOpen(false)}>Studio</Link>
        <Link href="#academy" onClick={() => setOpen(false)}>Academy</Link>
        <Link href="#launchpad" onClick={() => setOpen(false)}>Launchpad</Link>
        <Link href="#courses" onClick={() => setOpen(false)}>Courses</Link>
        <Link href="#work" onClick={() => setOpen(false)}>Work</Link>
        <Link href="#contact" onClick={() => setOpen(false)}>Start a project</Link>
      </div>
    </nav>
  );
}