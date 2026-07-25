"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SmartImage from "./SmartImage";

const Hero3D = dynamic(() => import("./three/Hero3D"), {
  ssr: false,
  loading: () => null,
});

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [gl, setGl] = useState<boolean | null>(null);
  useEffect(() => setGl(webglAvailable()), []);

  return (
    <section className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden bg-ink">
      {gl && <Hero3D />}
      {gl === false && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-6 opacity-60"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease }}
        >
          <SmartImage src="/campaign/hero-1.jpg" alt="Campaign" label="Campaign I" className="h-2/3 w-1/3" />
          <SmartImage src="/campaign/hero-2.jpg" alt="Campaign" label="Campaign II" className="h-3/4 w-1/3" />
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />

      <div className="relative z-10 px-6 text-center">
        <div className="text-[10px] uppercase tracking-luxe text-gold">
          ✦ Digital flagship
        </div>
        <h1 className="mt-6 font-serif text-4xl uppercase tracking-luxe text-bone sm:text-5xl md:text-7xl">
          Glass Tables
        </h1>
        <p className="mt-6 font-serif text-lg italic text-bone/70 md:text-xl">
          Brilliance, engineered.
        </p>
        <div>
          <Link
            href="/shop"
            className="mt-12 inline-block border border-gold/60 px-10 py-4 text-[11px] uppercase tracking-luxe text-bone transition-all duration-700 ease-luxe hover:border-gold hover:bg-gold hover:text-ink"
          >
            Enter the Collection
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-bone/40">
        Scroll
      </div>
    </section>
  );
}
