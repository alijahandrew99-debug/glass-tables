"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SmartImage from "./SmartImage";

/**
 * Full-bleed campaign image behind a section: slow parallax drift,
 * ink gradient overlay so type stays legible.
 */
export default function ImageBackdrop({
  src,
  label,
  children,
  strength = 0.55,
  className = "",
}: {
  src: string;
  label?: string;
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-12%_0]">
        <SmartImage
          src={src}
          alt={label ?? "Glass Tables campaign"}
          label={label}
          className="h-full w-full"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(10,10,10,${Math.min(1, strength + 0.12)}) 0%, rgba(10,10,10,${strength}) 45%, rgba(10,10,10,${Math.min(1, strength + 0.18)}) 100%)`,
        }}
      />
      <div className="relative">{children}</div>
    </section>
  );
}
