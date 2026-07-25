import Reveal from "./Reveal";
import ImageBackdrop from "./ImageBackdrop";

export default function LegalPage({
  eyebrow,
  title,
  blocks,
}: {
  eyebrow: string;
  title: string;
  blocks: { h: string; p: string }[];
}) {
  return (
    <ImageBackdrop src="/campaign/bg-2.jpg" label="Glass Tables" strength={0.68}>
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-40 md:pt-48">
      <Reveal>
        <div className="text-[10px] uppercase tracking-luxe text-gold">
          ✦ {eyebrow}
        </div>
        <h1 className="mt-4 font-serif text-3xl uppercase tracking-luxe md:text-4xl">
          {title}
        </h1>
      </Reveal>
      <div className="mt-12 space-y-10">
        {blocks.map((b) => (
          <Reveal key={b.h}>
            <h2 className="text-[11px] uppercase tracking-luxe text-bone/80">
              {b.h}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-bone/50">{b.p}</p>
          </Reveal>
        ))}
      </div>
    </div>
    </ImageBackdrop>
  );
}
