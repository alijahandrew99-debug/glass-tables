"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { formatPrice, type Product } from "@/lib/products";
import GalleryViewer from "./GalleryViewer";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import ImageBackdrop from "./ImageBackdrop";
import BundleOffer from "./BundleOffer";
import SizeGuide from "./SizeGuide";

export default function ProductView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const add = useCart((s) => s.add);
  const [size, setSize] = useState<string | null>(
    product.sizes ? null : "one-size"
  );
  const [sizeError, setSizeError] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [guideOpen, setGuideOpen] = useState(false);

  const addToBag = () => {
    if (product.sizes && !size) {
      setSizeError(true);
      return;
    }
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: size === "one-size" ? null : size,
    });
  };

  const sections = [
    { id: "details", title: "Details", body: product.details },
    { id: "materials", title: "Materials", body: [product.materials] },
    {
      id: "shipping",
      title: "Shipping & Returns",
      body: [
        "Complimentary shipping on orders over $100.",
        "30-day returns on unworn pieces in original case.",
      ],
    },
  ];

  return (
    <>
      <ImageBackdrop src="/campaign/bg-8.jpg" label={product.name} strength={0.62}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 pt-36 md:grid-cols-2 md:px-8 md:pt-44">
        <GalleryViewer images={product.images} name={product.name} />

        <div className="md:pl-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[10px] uppercase tracking-luxe text-gold">
              {product.category}
            </div>
            <h1 className="mt-3 font-serif text-3xl uppercase tracking-luxe md:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4 text-lg text-gold">
              {formatPrice(product.price)}
            </div>
            <p className="mt-6 max-w-[46ch] font-serif text-lg italic leading-relaxed text-bone/70">
              {product.description}
            </p>

            {product.sizes && (
              <div className="mt-10">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-luxe text-bone/60">
                    Size
                    {sizeError && (
                      <span className="ml-3 text-gold">Select a size</span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuideOpen(true)}
                    className="border-b border-gold/50 pb-0.5 text-[10px] uppercase tracking-luxe text-gold transition-opacity duration-500 hover:opacity-70"
                  >
                    Size guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                      className={`min-w-14 border px-4 py-3 text-xs transition-all duration-500 ${
                        size === s
                          ? "border-gold bg-gold text-ink"
                          : "border-bone/20 text-bone/70 hover:border-bone/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={addToBag}
              className="btn-lux mt-10 w-full py-5 text-[11px] uppercase tracking-luxe"
            >
              Add to Bag — {formatPrice(product.price)}
            </button>

            <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-wide2 text-bone/45">
              <span className="text-gold">✦</span>
              First drop — 50 per style, each piece numbered by hand
            </div>

            <div className="mt-12 divide-y divide-bone/10 border-y border-bone/10">
              {sections.map((s) => (
                <div key={s.id}>
                  <button
                    onClick={() =>
                      setOpenSection(openSection === s.id ? null : s.id)
                    }
                    className="flex w-full items-center justify-between py-5 text-left text-[11px] uppercase tracking-luxe text-bone/80"
                  >
                    {s.title}
                    <span className="text-gold">
                      {openSection === s.id ? "−" : "+"}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openSection === s.id ? "auto" : 0,
                      opacity: openSection === s.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 pb-6 text-sm leading-relaxed text-bone/50">
                      {s.body.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      </ImageBackdrop>

      {/* Complete the collection */}
      <ImageBackdrop src="/campaign/bg-9.jpg" label="Complete the collection" strength={0.58} className="border-t border-bone/10">
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <h2 className="font-serif text-2xl uppercase tracking-luxe md:text-3xl">
            Complete the collection
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 items-start gap-6 md:grid-cols-3 md:gap-10">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
      {!product.bundle && <BundleOffer />}
      </ImageBackdrop>

      {/* Sticky mobile buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-bone/10 bg-ink/95 px-5 py-4 backdrop-blur-md md:hidden">
        <div>
          <div className="font-serif text-sm tracking-wide2">{product.name}</div>
          <div className="text-xs text-gold">{formatPrice(product.price)}</div>
        </div>
        <button
          onClick={addToBag}
          className="btn-lux px-6 py-3 text-[10px] uppercase tracking-luxe"
        >
          Add to Bag
        </button>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}
