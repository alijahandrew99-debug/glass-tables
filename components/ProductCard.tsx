"use client";

import Link from "next/link";
import { useState } from "react";
import TiltCard from "./TiltCard";
import SmartImage from "./SmartImage";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const img = hover && product.images[1] ? product.images[1] : product.images[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block"
    >
      {/* vitrine: near-black case, hairline gold frame, top spotlight */}
      <TiltCard className="flex flex-col overflow-hidden border border-gold/30 bg-[#0C0B0A] transition-colors duration-700 group-hover:border-gold/60">
        <div className="relative m-2 aspect-[3/4] shrink-0 overflow-hidden bg-[#111]">
          <SmartImage
            src={img}
            alt={product.name}
            label={product.name}
            className="h-full w-full object-top transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_45%_at_50%_0%,rgba(250,247,242,0.10),transparent_60%)]" />
          {/* hover hint */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center pb-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="border border-bone/40 bg-ink/40 px-4 py-1.5 text-[9px] uppercase tracking-luxe text-bone backdrop-blur-sm">
              View piece
            </span>
          </div>
        </div>
        <div className="flex items-baseline justify-between px-4 pb-4 pt-1">
          <div>
            <div className="font-serif text-base tracking-wide2">{product.name}</div>
            <div className="mt-1 text-[10px] uppercase tracking-luxe text-bone/40">
              {product.category}
            </div>
          </div>
          <div className="shrink-0 pl-2 text-sm text-gold">
            {formatPrice(product.price)}
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
