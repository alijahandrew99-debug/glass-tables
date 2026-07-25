"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useCart, cartTotal } from "@/store/cart";
import { bundleProduct, bundleSavings, formatPrice } from "@/lib/products";
import SmartImage from "./SmartImage";

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove } = useCart();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const checkout = async () => {
    setBusy(true);
    setNotice("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, size: i.size, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setNotice(
        data.error === "stripe_not_configured"
          ? "Checkout opens once Stripe keys are added. See README."
          : "Checkout is unavailable right now. Please try again."
      );
    } catch {
      setNotice("Checkout is unavailable right now. Please try again.");
    }
    setBusy(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-bone/10 bg-ink"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
              <div className="text-[11px] uppercase tracking-luxe">
                Your bag
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-luxe text-bone/60 hover:text-gold"
              >
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="text-gold">✦</span>
                <p className="font-serif text-xl italic text-bone/70">
                  Your bag is empty. It doesn&apos;t have to be.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold"
                >
                  Enter the Collection
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  {items.map((i) => (
                    <div
                      key={i.slug + i.size}
                      className="mb-6 flex gap-4 border-b border-bone/5 pb-6"
                    >
                      <div className="h-24 w-20 shrink-0 overflow-hidden bg-[#111]">
                        <SmartImage
                          src={i.image}
                          alt={i.name}
                          label={i.name}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div className="font-serif tracking-wide2">{i.name}</div>
                          <div className="text-sm text-gold">
                            {formatPrice(i.price * i.qty)}
                          </div>
                        </div>
                        {i.size && (
                          <div className="mt-1 text-[10px] uppercase tracking-luxe text-bone/40">
                            Size {i.size}
                          </div>
                        )}
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-bone/15 px-3 py-1">
                            <button
                              onClick={() => setQty(i.slug, i.size, i.qty - 1)}
                              className="text-bone/60 hover:text-gold"
                            >
                              −
                            </button>
                            <span className="w-4 text-center text-xs">{i.qty}</span>
                            <button
                              onClick={() => setQty(i.slug, i.size, i.qty + 1)}
                              className="text-bone/60 hover:text-gold"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => remove(i.slug, i.size)}
                            className="text-[10px] uppercase tracking-luxe text-bone/40 hover:text-bone"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-bone/10 px-6 py-6">
                  {/* free-shipping progress */}
                  {(() => {
                    const total = cartTotal(items);
                    const goal = 100;
                    const pct = Math.min(100, (total / goal) * 100);
                    const left = goal - total;
                    return (
                      <div className="mb-5">
                        <p className="text-[10px] uppercase tracking-luxe text-bone/60">
                          {left > 0 ? (
                            <>
                              <span className="text-gold">
                                {formatPrice(left)}
                              </span>{" "}
                              away from complimentary shipping
                            </>
                          ) : (
                            <span className="text-gold">
                              ✦ You&apos;ve unlocked complimentary shipping
                            </span>
                          )}
                        </p>
                        <div className="mt-2 h-px w-full bg-bone/15">
                          <div
                            className="h-px bg-gold transition-all duration-700 ease-luxe"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}
                  {!items.some((i) => i.slug === bundleProduct.slug) &&
                    cartTotal(items) < bundleProduct.price && (
                      <Link
                        href="/product/the-collection"
                        onClick={() => setOpen(false)}
                        className="mb-5 block border border-gold/45 px-4 py-3 text-center text-[10px] uppercase tracking-luxe text-gold transition-colors duration-500 hover:border-gold"
                      >
                        ✦ Take all four instead —{" "}
                        {formatPrice(bundleProduct.price)} (save{" "}
                        {formatPrice(bundleSavings)})
                      </Link>
                    )}
                  <div className="flex justify-between text-sm">
                    <span className="uppercase tracking-luxe text-bone/60 text-[11px]">
                      Subtotal
                    </span>
                    <span className="text-gold">{formatPrice(cartTotal(items))}</span>
                  </div>
                  <p className="mt-2 text-[10px] text-bone/40">
                    Shipping calculated at checkout · 30-day returns
                  </p>
                  {notice && (
                    <p className="mt-3 text-[11px] text-gold">{notice}</p>
                  )}
                  <button
                    onClick={checkout}
                    disabled={busy}
                    className="btn-lux mt-5 w-full py-4 text-[11px] uppercase tracking-luxe disabled:opacity-50"
                  >
                    {busy ? "One moment…" : "Checkout"}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
