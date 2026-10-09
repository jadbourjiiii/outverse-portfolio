"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroSplash() {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const previousOverflowRef = useRef<string>("");

  useEffect(() => {
    if (previousOverflowRef.current === "") {
      previousOverflowRef.current = document.body.style.overflow;
    }

    if (!isVisible) {
      document.body.style.overflow = previousOverflowRef.current;
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const exitDelay = reducedMotion ? 1000 : 3000;
    let removeTimer: number | undefined;

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
      removeTimer = window.setTimeout(
        () => setIsVisible(false),
        reducedMotion ? 0 : 800
      );
    }, exitDelay);

    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(exitTimer);
      if (removeTimer !== undefined) {
        window.clearTimeout(removeTimer);
      }
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`intro-splash${isExiting ? " intro-splash-exiting" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="intro-splash-content">
        <span className="intro-splash-mark" aria-hidden="true" />
        <h1 className="intro-splash-title">
          <span className="intro-splash-first-line">
            Ideas don&apos;t build themselves.
          </span>
          <em>We turn them into digital experiences.</em>
        </h1>
      </div>
    </div>
  );
}
