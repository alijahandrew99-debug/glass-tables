"use client";

import { useRef, useState } from "react";

/**
 * 3D tilt card: perspective transform following the cursor, gold edge-light
 * on the facing side, soft shadow that shifts opposite the tilt.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glow, setGlow] = useState<React.CSSProperties>({ opacity: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${py * -7}deg) rotateY(${px * 8}deg) translateZ(4px)`,
      boxShadow: `${-px * 24}px ${18 - py * 12}px 48px rgba(0,0,0,0.55)`,
      transition: "box-shadow 0.2s",
    });
    setGlow({
      opacity: 1,
      background: `linear-gradient(${115 + px * 40}deg, transparent 40%, rgba(232,180,176,${
        0.10 + Math.abs(px) * 0.18
      }) 70%, transparent 90%)`,
    });
  };

  const onLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), box-shadow 0.8s",
    });
    setGlow({ opacity: 0, transition: "opacity 0.6s" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0"
        style={glow}
        aria-hidden
      />
    </div>
  );
}
