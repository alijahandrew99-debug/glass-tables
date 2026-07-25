"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Unit = "in" | "cm";

const ROWS: {
  size: string;
  in: [string, string, string, string];
  cm: [string, string, string, string];
}[] = [
  { size: "XS", in: ["31–32", "26–27", "24–25", "34–35"], cm: ["79–81", "66–69", "61–64", "86–89"] },
  { size: "S",  in: ["33–34", "28–29", "26–27", "36–37"], cm: ["84–86", "71–74", "66–69", "91–94"] },
  { size: "M",  in: ["35–36", "30–31", "28–29", "38–39"], cm: ["89–91", "76–79", "71–74", "97–99"] },
  { size: "L",  in: ["37–39", "32–34", "30–32", "40–42"], cm: ["94–99", "81–86", "76–81", "102–107"] },
];

const COLS = ["Bust", "Underbust", "Waist", "Hip"];

const HOW = [
  ["Bust", "Around the fullest part of the chest, tape level."],
  ["Underbust", "Directly under the bust, where a band sits."],
  ["Waist", "The narrowest part of the natural waist."],
  ["Hip", "Around the fullest part, feet together."],
];

export default function SizeGuide({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [unit, setUnit] = useState<Unit>("in");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-ink/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label="Size guide"
            className="fixed inset-x-0 bottom-0 z-[85] mx-auto max-h-[90svh] w-full max-w-lg overflow-y-auto border border-gold/30 bg-ink p-6 md:inset-0 md:bottom-auto md:top-1/2 md:h-auto md:-translate-y-1/2 md:p-8"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="edge-light left-0 hidden md:block" />
            <div className="edge-light right-0 hidden md:block" />

            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-luxe text-gold">
                  ✦ The fit
                </div>
                <h2 className="mt-2 font-serif text-2xl uppercase tracking-luxe md:text-3xl">
                  Size Guide
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-[11px] uppercase tracking-luxe text-bone/60 transition-colors duration-500 hover:text-gold"
              >
                Close
              </button>
            </div>

            {/* unit toggle */}
            <div className="mt-6 inline-flex border border-bone/15">
              {(["in", "cm"] as Unit[]).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-5 py-2 text-[10px] uppercase tracking-luxe transition-colors duration-300 ${
                    unit === u ? "bg-gold text-ink" : "text-bone/60 hover:text-bone"
                  }`}
                >
                  {u === "in" ? "Inches" : "Cm"}
                </button>
              ))}
            </div>

            {/* chart */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gold/30">
                    <th className="py-3 pr-3 text-[10px] uppercase tracking-luxe text-gold">
                      Size
                    </th>
                    {COLS.map((c) => (
                      <th
                        key={c}
                        className="py-3 px-3 text-[10px] uppercase tracking-wide2 text-bone/70"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-[var(--font-sans)] tabular-nums">
                  {ROWS.map((r) => (
                    <tr
                      key={r.size}
                      className="border-b border-bone/10 last:border-0"
                    >
                      <td className="py-3 pr-3 font-serif text-lg text-bone">
                        {r.size}
                      </td>
                      {r[unit].map((v, i) => (
                        <td
                          key={i}
                          className="py-3 px-3 text-sm text-bone/60"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* how to measure */}
            <div className="mt-8">
              <div className="text-[10px] uppercase tracking-luxe text-gold">
                How to measure
              </div>
              <ul className="mt-4 space-y-3">
                {HOW.map(([label, tip]) => (
                  <li key={label} className="flex gap-3 text-sm leading-relaxed">
                    <span className="w-20 shrink-0 text-[11px] uppercase tracking-wide2 text-bone/80">
                      {label}
                    </span>
                    <span className="text-bone/50">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 border-l-2 border-gold pl-4 text-[11px] leading-relaxed text-bone/50">
              Between sizes? Size up for lace, size down for swim — it runs
              generous. Every order includes 30-day returns, so a swap is
              simple.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
