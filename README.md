# GLASS TABLES — Digital Flagship

Next.js 14 · Tailwind · Framer Motion · React Three Fiber · Stripe · Zustand

## Run it

```bash
npm install
npm run dev        # → http://localhost:3005
```

## Where to drop your images

All images live in `public/`. The site shows elegant dark placeholder blocks
for any file that isn't there yet — drop these in and refresh:

```
public/campaign/hero-1.png … hero-6.png      ← model/campaign shots
public/products/tennis-bracelet-1.jpg (+ -2) ← product photos, 2 per product
public/products/solitaire-ring-1.jpg (+ -2)
public/products/pendant-1.jpg (+ -2)
public/products/silk-set-1.jpg (+ -2)
public/products/gold-coast-bikini-1.jpg (+ -2)
```

Portrait orientation (3:4-ish) looks best everywhere.

## Edit products & prices

One file: [`lib/products.ts`](lib/products.ts). Name, price, description,
details, sizes, image paths — change anything, the whole site updates
(cards, product pages, cart, Stripe checkout amounts).

## Stripe — from placeholder to live money

1. Create a Stripe account → Dashboard → **Developers → API keys**
2. In **Test mode**, copy the *Secret key* (`sk_test_…`)
3. Open `.env.local` and replace `sk_test_PASTE_ME` with it, restart dev server
4. Test a checkout with card `4242 4242 4242 4242`, any future date, any CVC
5. **Going live:** flip the Dashboard toggle to Live mode, copy the `sk_live_…`
   key into `.env.local` (on Vercel: Project → Settings → Environment
   Variables → `STRIPE_SECRET_KEY`), and complete Stripe's activation form
   (business details + bank account for payouts)

Prices are charged from the server-side catalog — editing HTML in the browser
can't change what a customer pays.

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. vercel.com → Add New Project → import the repo (defaults are fine)
3. Add env vars: `STRIPE_SECRET_KEY`, and set `NEXT_PUBLIC_SITE_URL` to your
   live URL (e.g. `https://glasstables.com`) so checkout redirects home correctly
4. Connect your domain under Project → Settings → Domains

## Email capture

The "private list" form currently confirms locally. Wire it to your email
provider (Klaviyo/Mailchimp/Resend) by replacing the `onSubmit` in
`components/EmailCapture.tsx` with a POST to their API — one function.

## Notes

- The 3D hero lazy-loads and falls back to static parallax when WebGL is off
- The Aurelia page carries the AI-model disclosure as part of the brand story
- Cart persists in localStorage under the key `glass-tables-bag`
