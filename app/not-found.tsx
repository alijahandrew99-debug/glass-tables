import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-6 pt-24 text-center">
      <span className="text-gold">✦</span>
      <h1 className="mt-6 font-serif text-3xl uppercase tracking-luxe">
        Nothing here
      </h1>
      <p className="mt-4 font-serif italic text-bone/60">
        The piece you&apos;re looking for has moved, or never existed.
      </p>
      <Link
        href="/shop"
        className="mt-10 border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold"
      >
        Enter the Collection
      </Link>
    </div>
  );
}
