"use client";
import { useEffect, useRef } from "react";

export default function Stars() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const x = c.getContext("2d");
    let W, H, stars = [], raf;

    function make() {
      stars = [];
      const n = Math.min(220, Math.floor((W * H) / 9000));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4 + 0.3,
          p: Math.random() * Math.PI * 2,
          s: 0.008 + Math.random() * 0.02,
          big: Math.random() < 0.06,
        });
      }
    }
    function resize() {
      W = c.width = innerWidth;
      H = c.height = innerHeight;
      make();
    }
    function draw() {
      x.clearRect(0, 0, W, H);
      for (const st of stars) {
        st.p += st.s;
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(st.p));
        x.globalAlpha = st.big ? a + 0.25 : a;
        x.fillStyle = "#ffffff";
        x.beginPath();
        x.arc(st.x, st.y, st.big ? st.r * 1.8 : st.r, 0, 7);
        x.fill();
        if (st.big) {
          x.globalAlpha = a * 0.35;
          x.fillRect(st.x - st.r * 5, st.y - 0.5, st.r * 10, 1);
          x.fillRect(st.x - 0.5, st.y - st.r * 5, 1, st.r * 10);
        }
      }
      x.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="stars" ref={ref} />;
}