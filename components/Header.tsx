"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { bundleSavings, formatPrice } from "@/lib/products";

const NOTICES = [
  "Complimentary shipping on orders over $100",
  "First drop — 50 per style, numbered by hand",
  `The Complete Collection — save ${formatPrice(bundleSavings)}`,
];

export default function Header() {
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notice, setNotice] = useState(0);
  const count = items.reduce((n, i) => n + i.qty, 0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const rotate = setInterval(
      () => setNotice((n) => (n + 1) % NOTICES.length),
      5000
    );
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(rotate);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 bg-gold/95 py-1.5 text-center text-[10px] uppercase tracking-luxe text-ink">
        <span key={notice} className="inline-block animate-[rise_0.5s_ease]">
          {NOTICES[notice]}
        </span>
      </div>
      <header
        className={`fixed inset-x-0 top-[26px] z-40 transition-all duration-700 ease-luxe ${
          scrolled
            ? "border-b border-bone/10 bg-ink/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <nav className="hidden gap-8 text-[11px] uppercase tracking-luxe text-bone/70 md:flex">
            <Link href="/shop" className="transition-colors duration-500 hover:text-gold">
              Shop
            </Link>
            <Link href="/campaign" className="transition-colors duration-500 hover:text-gold">
              Campaign
            </Link>
          </nav>
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-lg tracking-luxe text-bone md:text-xl"
          >
            GLASS&nbsp;<span className="text-gold text-sm align-middle">✦</span>&nbsp;TABLES
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/aurelia"
              className="hidden text-[11px] uppercase tracking-luxe text-bone/70 transition-colors duration-500 hover:text-gold md:block"
            >
              The Face
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="text-[11px] uppercase tracking-luxe text-bone/70 transition-colors duration-500 hover:text-gold"
            >
              Bag{mounted && count > 0 ? ` (${count})` : ""}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
