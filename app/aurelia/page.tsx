import Link from "next/link";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import ImageBackdrop from "@/components/ImageBackdrop";

export const metadata = { title: "Aurelia — The Face of GLASS TABLES" };

const packages = [
  {
    name: "The Placement",
    price: "$1,500",
    unit: "per campaign",
    body: "Aurelia wears or holds your product in a three-image editorial set, shot in the Glass Tables visual language. Delivered in 5 days with full commercial usage.",
  },
  {
    name: "The Collection",
    price: "$3,500",
    unit: "per drop",
    body: "A full campaign: twelve editorial images and two short films of Aurelia with your collection — enough to run a launch across every channel.",
  },
  {
    name: "The Ambassador",
    price: "Custom",
    unit: "exclusive term",
    body: "Aurelia fronts your brand exclusively for a season. Category exclusivity, ongoing content, and her feed carries your name.",
  },
];

export default function AureliaPage() {
  return (
    <>
      <ImageBackdrop src="/campaign/bg-1.jpg" label="Aurelia" strength={0.5} className="pt-40 md:pt-48">
        <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal>
              <div className="aspect-[3/4] overflow-hidden border border-bone/10 bg-[#111]">
                <SmartImage
                  src="/campaign/hero-6.jpg"
                  alt="Aurelia, the AI-generated face of Glass Tables"
                  label="Aurelia"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="text-[10px] uppercase tracking-luxe text-gold">
                ✦ The Face
              </div>
              <h1 className="mt-4 font-serif text-4xl uppercase tracking-luxe md:text-6xl">
                Aurelia
              </h1>
              <p className="mt-8 font-serif text-2xl italic leading-relaxed text-bone/80">
                Aurelia is not real.
                <br />
                The craftsmanship is.
              </p>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-bone/60">
                <p>
                  Aurelia is the house muse of Glass Tables — a face generated
                  entirely by artificial intelligence. She does not age, tire,
                  or take a bad photograph. She has never worn anything we
                  didn&apos;t make.
                </p>
                <p>
                  We tell you this plainly because luxury is confidence, and
                  confidence doesn&apos;t hide its methods. Every piece in
                  every photograph is a real garment you can hold. The hands
                  that sew them are human.
                </p>
                <p>
                  What&apos;s synthetic is the muse. What arrives at your door
                  is not.
                </p>
              </div>
              <div className="mt-10 border-l-2 border-gold pl-5 text-[11px] uppercase leading-relaxed tracking-wide2 text-bone/50">
                Disclosure: Imagery of &quot;Aurelia&quot; on this site is
                AI-generated. Product photography represents physical items as
                sold.
              </div>
            </Reveal>
          </div>
        </div>
      </ImageBackdrop>

      {/* ---- Work with Aurelia (monetization) ---- */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="text-[10px] uppercase tracking-luxe text-gold">
            ✦ Work with her
          </div>
          <h2 className="mt-4 font-serif text-3xl uppercase tracking-luxe md:text-5xl">
            Aurelia takes bookings
          </h2>
          <p className="mt-6 max-w-[56ch] text-sm leading-relaxed text-bone/55">
            A human model of this caliber books at $5,000 a day, needs flights,
            approvals, and reshoots. Aurelia needs a brief. She has fronted
            every Glass Tables campaign on this site — and she is available,
            selectively, to other brands that fit her world.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12}>
              <div className="flex h-full flex-col border border-bone/10 p-8 transition-colors duration-700 hover:border-gold/60">
                <div className="text-[10px] uppercase tracking-luxe text-bone/50">
                  {p.name}
                </div>
                <div className="mt-4 font-serif text-4xl text-gold">
                  {p.price}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-luxe text-bone/40">
                  {p.unit}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-bone/55">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <a
            href="mailto:btk18000@gmail.com?subject=Aurelia%20booking%20inquiry&body=Brand%3A%0AProduct%3A%0APackage%20of%20interest%3A%0ATimeline%3A"
            className="btn-lux inline-block px-12 py-5 text-[11px] uppercase tracking-luxe"
          >
            Inquire about a booking
          </a>
          <p className="mt-5 text-[10px] uppercase tracking-luxe text-bone/35">
            Every Aurelia campaign ships with the same AI disclosure you see
            above — transparency is the product.
          </p>
        </Reveal>
      </section>

      {/* ---- her world ---- */}
      <ImageBackdrop src="/campaign/bg-3.jpg" label="Aurelia travels" strength={0.42}>
        <div className="mx-auto max-w-3xl px-5 py-28 text-center md:py-40">
          <Reveal>
            <p className="font-serif text-2xl uppercase leading-snug tracking-luxe text-bone md:text-4xl">
              She goes wherever
              <br />
              the brief sends her
            </p>
            <p className="mt-6 text-sm text-bone/60">
              Paris at golden hour. A private terminal at dawn. Your product,
              anywhere, without a single boarding pass.
            </p>
            <Link
              href="/campaign"
              className="mt-10 inline-block border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold"
            >
              See the campaign
            </Link>
          </Reveal>
        </div>
      </ImageBackdrop>
    </>
  );
}
