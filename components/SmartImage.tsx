"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the image if it exists in /public, otherwise an elegant dark
 * placeholder block carrying the product name — so the site looks composed
 * before campaign files are dropped in.
 */
export default function SmartImage({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // A 404 that resolves before hydration never fires React's onError —
  // recheck the img after mount so placeholders still swap in.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed)
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#141210] via-[#0d0c0a] to-[#1a1712] ${className}`}
        aria-label={alt}
      >
        <div className="absolute inset-3 border border-bone/10" />
        <div className="text-center">
          <div className="text-gold">✦</div>
          <div className="mt-2 px-4 font-serif text-sm tracking-wide2 text-bone/40">
            {label ?? alt}
          </div>
        </div>
      </div>
    );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
}
