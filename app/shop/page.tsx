"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import ImageBackdrop from "@/components/ImageBackdrop";
import BundleOffer from "@/components/BundleOffer";
import { catalog, type Category } from "@/lib/products";

const filters: ("All" | Category)[] = ["All", "Lingerie", "Swim"];

export default function ShopPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list =
    filter === "All" ? catalog : catalog.filter((p) => p.category === filter);

  return (
    <div className="pb-28">
      <ImageBackdrop src="/campaign/flagship-interior.jpg" label="The Collection" strength={0.45} className="pt-40 md:pt-48">
        <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <Reveal>
            <div className="text-[10px] uppercase tracking-luxe text-gold">✦ Shop</div>
            <h1 className="mt-4 font-serif text-3xl uppercase tracking-luxe md:text-5xl">
              The Collection
            </h1>
            <p className="mt-5 max-w-[44ch] font-serif text-lg italic text-bone/70">
              One swim. Three lace. Fifty of each, then gone.
            </p>
          </Reveal>
        </div>
      </ImageBackdrop>

      <ImageBackdrop src="/campaign/bg-1.jpg" label="The pieces" strength={0.6}>
      <div className="mx-auto max-w-7xl px-5 pb-4 md:px-8">
      <div className="pt-12 flex gap-6 border-b border-bone/10 pb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[11px] uppercase tracking-luxe transition-colors duration-500 ${
              filter === f ? "text-gold" : "text-bone/50 hover:text-bone"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 items-start gap-6 pb-16 md:grid-cols-3 md:gap-10">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.1}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
      </div>
      <BundleOffer />
      </ImageBackdrop>
    </div>
  );
}
