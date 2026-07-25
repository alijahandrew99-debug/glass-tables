"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Film-roll hero: the full campaign, full-bleed. Cursor X scrubs through
 * the frames like a contact sheet; touch devices auto-cycle. The wordmark
 * sits in mix-blend-difference so Aurelia inverts through the letters.
 */
const FRAMES = [
  "/campaign/hero-1.jpg",
  "/campaign/bg-5.jpg",
  "/campaign/hero-2.jpg",
  "/campaign/bg-8.jpg",
  "/campaign/hero-4.jpg",
  "/campaign/bg-1.jpg",
  "/campaign/hero-5.jpg",
  "/campaign/bg-9.jpg",
  "/campaign/hero-6.jpg",
  "/campaign/bg-4.jpg",
];

export default function ScrubHero() {
  const [idx, setIdx] = useState(2);
  const raf = useRef(0);

  useEffect(() => {
    FRAMES.forEach((src) => {
      const im = new Image();
      im.src = src;
    });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = matchMedia("(hover: none)").matches;
    if (touch) {
      /* auto-cycle is the only non-user-driven motion — gate it on reduce */
      if (reduce) return;
      const t = setInterval(
        () => setIdx((i) => (i + 1) % FRAMES.length),
        1200
      );
      return () => clearInterval(t);
    }

    /* cursor scrub is user-initiated; it stays on even with reduced motion */
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const i = Math.floor((e.clientX / window.innerWidth) * FRAMES.length);
        setIdx(Math.min(FRAMES.length - 1, Math.max(0, i)));
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden bg-ink">
      {/* film frames */}
      {FRAMES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={i !== idx}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-linear"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/80" />

      {/* backlit boutique edge strips */}
      <div className="edge-light left-5 md:left-9" />
      <div className="edge-light right-5 md:right-9" />

      {/* wordmark carves into the image */}
      <div className="relative z-10 px-6 text-center">
        <div className="text-[10px] uppercase tracking-luxe text-gold">
          ✦ Digital flagship
        </div>
        <h1
          className="mt-6 font-serif text-4xl uppercase tracking-luxe text-bone mix-blend-difference sm:text-5xl md:text-7xl"
        >
          Glass <span className="align-middle text-3xl text-gold sm:text-4xl md:text-5xl">✦</span> Tables
        </h1>
        <p className="mt-6 font-serif text-lg italic text-bone/80 mix-blend-difference md:text-xl">
          Brilliance, engineered.
        </p>
        <div>
          <Link
            href="/shop"
            className="btn-lux mt-12 inline-block px-10 py-4 text-[11px] uppercase tracking-luxe"
          >
            Enter the Collection
          </Link>
        </div>
      </div>

      {/* film counter */}
      <div className="absolute bottom-8 right-6 z-10 flex items-center gap-4 md:right-10">
        <div className="flex gap-1.5">
          {FRAMES.map((_, i) => (
            <span
              key={i}
              className={`h-px w-4 transition-colors duration-300 ${
                i === idx ? "bg-gold" : "bg-bone/25"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-wide2 text-bone/60">
          {String(idx + 1).padStart(2, "0")} / {FRAMES.length}
        </span>
      </div>

      <div className="absolute bottom-8 left-6 z-10 hidden text-[10px] uppercase tracking-luxe text-bone/50 md:left-10 md:block">
        Move your cursor — Scroll to enter
      </div>
    </section>
  );
}
