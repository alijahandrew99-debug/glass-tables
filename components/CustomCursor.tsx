"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.body.classList.add("gt-cursor");
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const grow = () => ring.current?.classList.add("scale-150", "border-gold");
    const shrink = () => ring.current?.classList.remove("scale-150", "border-gold");

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    const mo = new MutationObserver(() => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("gt-cursor");
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <div ref={dot} className="absolute h-1.5 w-1.5 rounded-full bg-gold" />
      <div
        ref={ring}
        className="absolute h-8 w-8 rounded-full border border-bone/40 transition-[scale,border-color] duration-300"
      />
    </div>
  );
}
