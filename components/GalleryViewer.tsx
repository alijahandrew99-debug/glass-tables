"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "./SmartImage";

/**
 * Drag-to-rotate style viewer: horizontal drag (with velocity) cycles
 * through the product angles; hover shows a zoom lens on desktop.
 */
export default function GalleryViewer({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const acc = useRef(0);

  const cycle = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + images.length) % images.length);
  };

  const onMove = (e: React.MouseEvent) => {
    const b = frame.current?.getBoundingClientRect();
    if (!b) return;
    setLens({
      x: ((e.clientX - b.left) / b.width) * 100,
      y: ((e.clientY - b.top) / b.height) * 100,
    });
  };

  return (
    <div className="select-none">
      <motion.div
        ref={frame}
        className="relative aspect-[3/4] touch-pan-y overflow-hidden bg-[#111]"
        onPan={(_, info) => {
          acc.current += info.delta.x;
          if (Math.abs(acc.current) > 90) {
            cycle(acc.current < 0 ? 1 : -1);
            acc.current = 0;
          }
        }}
        onPanEnd={(_, info) => {
          if (Math.abs(info.velocity.x) > 500)
            cycle(info.velocity.x < 0 ? 1 : -1);
          acc.current = 0;
        }}
        onMouseMove={onMove}
        onMouseLeave={() => setLens(null)}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            className="absolute inset-0"
            custom={dir}
            initial={{ x: dir * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -60, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmartImage
              src={images[index]}
              alt={`${name} — view ${index + 1}`}
              label={name}
              className="pointer-events-none h-full w-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* zoom lens (desktop) */}
        {lens && (
          <div
            className="pointer-events-none absolute hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 shadow-2xl md:block"
            style={{
              left: `${lens.x}%`,
              top: `${lens.y}%`,
              backgroundImage: `url(${images[index]})`,
              backgroundSize: "300% 300%",
              backgroundPosition: `${lens.x}% ${lens.y}%`,
              backgroundColor: "#111",
            }}
          />
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-bone/50">
          Drag to view
        </div>
      </motion.div>

      <div className="mt-4 flex gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => {
              setDir(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-20 w-16 overflow-hidden border transition-colors duration-500 ${
              i === index ? "border-gold" : "border-transparent opacity-60"
            }`}
          >
            <SmartImage
              src={img}
              alt={`${name} thumbnail ${i + 1}`}
              label="✦"
              className="h-full w-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
