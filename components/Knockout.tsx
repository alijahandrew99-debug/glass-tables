import Reveal from "./Reveal";

/** Giant serif letters with the campaign photo living inside the letterforms. */
export default function Knockout() {
  return (
    <section className="overflow-hidden bg-ink py-24 text-center md:py-36">
      <Reveal>
        <div className="text-[10px] uppercase tracking-luxe text-gold">
          ✦ The house
        </div>
        <h2 className="knockout mx-auto mt-8 font-serif uppercase leading-[0.92]">
          Brilliance
          <br />
          Engineered
        </h2>
        <p className="mx-auto mt-8 max-w-[40ch] text-sm leading-relaxed text-bone/45">
          Every letter above is filled with the campaign itself. Nothing here
          is stock — the muse, the light, the line. All house-made.
        </p>
      </Reveal>
    </section>
  );
}
