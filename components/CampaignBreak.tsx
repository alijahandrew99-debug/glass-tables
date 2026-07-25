"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SmartImage from "./SmartImage";

export default function CampaignBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70svh] overflow-hidden md:h-[90svh]"
    >
      <motion.div style={{ y }} className="absolute inset-[-14%_0]">
        <SmartImage
          src="/campaign/hero-3.jpg"
          alt="Glass Tables campaign"
          label="Campaign — full bleed"
          className="h-full w-full"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.p
          className="max-w-3xl text-center font-serif text-2xl uppercase leading-snug tracking-luxe text-bone md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Designed to outlast
          <br />
          the trend cycle
        </motion.p>
      </div>
    </section>
  );
}
