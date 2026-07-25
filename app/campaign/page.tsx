import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import ImageBackdrop from "@/components/ImageBackdrop";

const shots = [
  { src: "/campaign/hero-1.jpg", label: "Campaign I", wide: true },
  { src: "/campaign/hero-2.jpg", label: "Campaign II", wide: false },
  { src: "/campaign/bg-1.jpg", label: "Campaign III", wide: false },
  { src: "/campaign/bg-2.jpg", label: "Campaign IV", wide: true },
  { src: "/campaign/hero-4.jpg", label: "Campaign V", wide: false },
  { src: "/products/garter-set-1.jpg", label: "Campaign VI", wide: false },
  { src: "/campaign/bg-3.jpg", label: "Campaign VII", wide: true },
  { src: "/campaign/hero-5.jpg", label: "Campaign VIII", wide: false },
  { src: "/campaign/bg-4.jpg", label: "Campaign IX", wide: false },
  { src: "/campaign/hero-6.jpg", label: "Campaign X", wide: true },
];

export default function CampaignPage() {
  return (
    <div className="pb-28">
      <ImageBackdrop src="/campaign/bg-8.jpg" label="The Campaign" strength={0.48} className="pt-40 md:pt-48">
      <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <Reveal>
          <div className="text-[10px] uppercase tracking-luxe text-gold">
            ✦ Editorial
          </div>
          <h1 className="mt-4 font-serif text-3xl uppercase tracking-luxe md:text-5xl">
            The Campaign
          </h1>
          <p className="mt-6 max-w-[50ch] font-serif text-lg italic text-bone/60">
            Aurelia, shot in low light, worn without occasion. Lingerie first
            — everything else follows her.
          </p>
        </Reveal>
      </div>
      </ImageBackdrop>

      <div className="mt-16 space-y-6 md:space-y-10">
        {shots.map((s, i) =>
          s.wide ? (
            <Reveal key={s.src} className="mx-auto max-w-7xl md:px-8">
              <div className="aspect-[16/10] overflow-hidden bg-[#111] md:aspect-[21/9]">
                <SmartImage src={s.src} alt={s.label} label={s.label} className="h-full w-full" />
              </div>
            </Reveal>
          ) : (
            <Reveal
              key={s.src}
              className={`mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 md:gap-10 md:px-8 ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#111]">
                <SmartImage src={s.src} alt={s.label} label={s.label} className="h-full w-full" />
              </div>
              <div className="flex items-center">
                <p className="max-w-[36ch] font-serif text-xl italic leading-relaxed text-bone/50 md:text-2xl">
                  {i % 2
                    ? "Nothing here is loud. Everything here is deliberate."
                    : "Light behaves differently around intention."}
                </p>
              </div>
            </Reveal>
          )
        )}
      </div>
    </div>
  );
}
