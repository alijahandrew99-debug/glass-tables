import Link from "next/link";
import ImageBackdrop from "./ImageBackdrop";

const cols = [
  {
    title: "House",
    links: [
      ["Shop", "/shop"],
      ["Campaign", "/campaign"],
      ["The Face", "/aurelia"],
    ],
  },
  {
    title: "Care",
    links: [
      ["Contact", "/contact"],
      ["Shipping & Returns", "/shipping"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-bone/10">
      <ImageBackdrop src="/campaign/bg-7.jpg" label="Glass Tables" strength={0.66}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div>
          <div className="font-serif text-xl tracking-luxe">
            GLASS <span className="text-gold text-base">✦</span> TABLES
          </div>
          <p className="mt-4 max-w-[26ch] text-xs leading-relaxed text-bone/50">
            Brilliance, engineered. One swim, three lace — numbered in drops
            of fifty, never restocked the same way twice.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-[10px] uppercase tracking-luxe text-gold">
              {c.title}
            </div>
            <ul className="mt-4 space-y-3">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-bone/60 transition-colors duration-500 hover:text-bone"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-bone/10 py-6 text-center text-[10px] uppercase tracking-luxe text-bone/40">
        © {new Date().getFullYear()} Glass Tables <span className="text-gold">✦</span> All rights reserved
      </div>
      </ImageBackdrop>
    </footer>
  );
}
