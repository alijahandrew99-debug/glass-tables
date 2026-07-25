"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductCard from "./ProductCard";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { catalog } from "@/lib/products";

/**
 * The lookbook rail: the section pins to the screen and the entire
 * collection slides horizontally as you scroll. Mobile gets a clean grid.
 */
export default function CollectionRail() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const mq = matchMedia("(min-width: 768px)");
    const setMq = () => setDesktop(mq.matches);
    setMq();
    mq.addEventListener("change", setMq);
    return () => mq.removeEventListener("change", setMq);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (track.current)
        setMaxX(
          Math.max(0, track.current.scrollWidth - window.innerWidth + 64)
        );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [desktop]);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  /* ---- mobile: calm grid ---- */
  if (!desktop)
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage src="/campaign/bg-5.jpg" alt="" className="h-full w-full" />
          <div className="absolute inset-0 bg-ink/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <Reveal>
            <div className="text-[10px] uppercase tracking-luxe text-gold">✦ Featured</div>
            <h2 className="mt-4 font-serif text-3xl uppercase tracking-luxe">The Collection</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 items-start gap-5">
            {catalog.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link href="/shop" className="border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold">
              View all pieces
            </Link>
          </Reveal>
        </div>
      </section>
    );

  /* ---- desktop: pinned horizontal lookbook ---- */
  return (
    <div ref={wrap} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage src="/campaign/bg-5.jpg" alt="" className="h-full w-full" />
          <div className="absolute inset-0 bg-ink/60" />
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="relative flex items-center gap-12 pl-[7vw] pr-[10vw]"
        >
          {/* lead card */}
          <div className="w-[380px] shrink-0">
            <div className="text-[10px] uppercase tracking-luxe text-gold">
              ✦ Featured
            </div>
            <h2 className="mt-4 font-serif text-5xl uppercase leading-tight tracking-luxe">
              The
              <br />
              Collection
            </h2>
            <p className="mt-6 max-w-[30ch] text-sm leading-relaxed text-bone/55">
              The first four. One swim, three lace. Keep scrolling — the shelf
              moves for you.
            </p>
          </div>

          {catalog.map((p) => (
            <div key={p.slug} className="w-[320px] shrink-0">
              <ProductCard product={p} />
            </div>
          ))}

          {/* end card */}
          <div className="flex w-[340px] shrink-0 items-center justify-center">
            <Link
              href="/shop"
              className="btn-lux px-10 py-5 text-[11px] uppercase tracking-luxe"
            >
              View the full shop
            </Link>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-bone/40">
          Scroll — the collection moves sideways
        </div>
      </div>
    </div>
  );
}
