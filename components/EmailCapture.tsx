"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import ImageBackdrop from "./ImageBackdrop";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <ImageBackdrop src="/campaign/bg-4.jpg" label="Private list" strength={0.5} className="border-t border-bone/10">
      <div className="mx-auto max-w-2xl px-5 py-24 text-center md:py-32">
        <Reveal>
          <div className="text-[10px] uppercase tracking-luxe text-gold">
            ✦ Private list
          </div>
          <h2 className="mt-4 font-serif text-2xl uppercase tracking-luxe md:text-4xl">
            First to every drop
          </h2>
          <p className="mt-4 text-sm text-bone/50">
            Launches, campaigns, and pieces that never reach the public shop.
          </p>
          {done ? (
            <p className="mt-10 font-serif text-lg italic text-gold">
              You&apos;re on the list.
            </p>
          ) : (
            <form
              className="mx-auto mt-10 flex max-w-md border-b border-bone/25 focus-within:border-gold"
              onSubmit={(e) => {
                e.preventDefault();
                if (/.+@.+\..+/.test(email)) setDone(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 pl-4 text-[11px] uppercase tracking-luxe text-gold"
              >
                Join
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </ImageBackdrop>
  );
}
