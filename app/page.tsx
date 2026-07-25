import Link from "next/link";
import ScrubHero from "@/components/ScrubHero";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import ImageBackdrop from "@/components/ImageBackdrop";
import EmailCapture from "@/components/EmailCapture";
import CampaignBreak from "@/components/CampaignBreak";
import CollectionRail from "@/components/CollectionRail";
import Knockout from "@/components/Knockout";
import BundleOffer from "@/components/BundleOffer";

export default function Home() {
  return (
    <>
      <ScrubHero />

      <CollectionRail />

      <BundleOffer />

      <Knockout />

      <CampaignBreak />

      {/* Maison */}
      <ImageBackdrop src="/campaign/flagship-exterior.jpg" label="The Maison" strength={0.42}>
        <div className="relative mx-auto max-w-4xl px-5 py-32 text-center md:py-48">
          <div className="edge-light left-0 hidden md:block" />
          <div className="edge-light right-0 hidden md:block" />
          <div className="text-[10px] uppercase tracking-luxe text-gold">✦ The Maison</div>
          <h2 className="mt-6 font-serif text-3xl uppercase leading-snug tracking-luxe md:text-5xl">
            The flagship is digital.
            <br />
            The standard isn&apos;t.
          </h2>
          <p className="mx-auto mt-8 max-w-[52ch] font-serif text-lg italic leading-relaxed text-bone/70">
            Glass Tables is a digital maison: our muses are generated, our
            craftsmanship is not. Every piece is cut, cast, and finished by
            hand — the house simply lives where you do.
          </p>
        </div>
      </ImageBackdrop>

      {/* The Face teaser */}
      <ImageBackdrop src="/campaign/flagship-interior.jpg" label="The Face" strength={0.55}>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 md:grid-cols-2 md:px-8 md:py-36">
        <Reveal>
          <div className="aspect-[3/4] overflow-hidden bg-[#111]">
            <SmartImage
              src="/campaign/hero-2.jpg"
              alt="Aurelia — the face of Glass Tables"
              label="Aurelia"
              className="h-full w-full object-top"
            />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="text-[10px] uppercase tracking-luxe text-gold">
            ✦ The Face
          </div>
          <h2 className="mt-4 font-serif text-3xl uppercase tracking-luxe md:text-5xl">
            Aurelia
          </h2>
          <p className="mt-6 max-w-[42ch] font-serif text-lg italic leading-relaxed text-bone/70">
            Aurelia is not real. The craftsmanship is.
          </p>
          <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-bone/50">
            Our house muse is AI-generated — and we say so out loud. What she
            wears is cut, sewn, and finished by hand.
          </p>
          <Link
            href="/aurelia"
            className="mt-8 inline-block border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold transition-opacity duration-500 hover:opacity-70"
          >
            Meet Aurelia
          </Link>
        </Reveal>
      </section>
      </ImageBackdrop>

      <EmailCapture />
    </>
  );
}
