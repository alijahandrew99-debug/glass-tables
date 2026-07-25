import Link from "next/link";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { bundleProduct, bundleSavings, formatPrice } from "@/lib/products";

/** The whole-set sell: four flat-lays, one price, one decision. */
export default function BundleOffer() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="relative overflow-hidden border border-gold/40 bg-ink/60 p-8 backdrop-blur-sm md:p-12">
          <div className="edge-light left-0 hidden md:block" />
          <div className="edge-light right-0 hidden md:block" />

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="text-[10px] uppercase tracking-luxe text-gold">
                ✦ The Complete Collection
              </div>
              <h2 className="mt-4 font-serif text-3xl uppercase leading-tight tracking-luxe md:text-4xl">
                Own the
                <br />
                first drop
              </h2>
              <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-bone/60">
                All four — the swim, the blush, the noir, the rouge — in your
                size, in one box. The full capsule for less than three sets
                alone.
              </p>
              <div className="mt-7 flex items-baseline gap-4">
                <span className="font-serif text-4xl text-gold">
                  {formatPrice(bundleProduct.price)}
                </span>
                <span className="text-lg text-bone/35 line-through">
                  {formatPrice(bundleProduct.compareAt ?? 0)}
                </span>
                <span className="border border-gold/60 px-3 py-1 text-[10px] uppercase tracking-luxe text-gold">
                  Save {formatPrice(bundleSavings)}
                </span>
              </div>
              <Link
                href="/product/the-collection"
                className="btn-lux mt-8 inline-block px-10 py-4 text-[11px] uppercase tracking-luxe"
              >
                Take the collection
              </Link>
              <p className="mt-4 text-[10px] uppercase tracking-wide2 text-bone/35">
                First drop — 50 collections, numbered
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {bundleProduct.images.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] overflow-hidden border border-bone/10 bg-[#111]"
                >
                  <SmartImage
                    src={src}
                    alt={bundleProduct.details[i] ?? "Glass Tables set"}
                    label="✦"
                    className="h-full w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_55%_at_50%_0%,rgba(250,247,242,0.10),transparent_65%)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
