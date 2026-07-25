import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("PASTE_ME")) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const stripe = new Stripe(key);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3005";

  try {
    const { items } = (await req.json()) as {
      items: { slug: string; size: string | null; qty: number }[];
    };
    if (!items?.length)
      return NextResponse.json({ error: "empty_cart" }, { status: 400 });

    // Prices always come from the server-side catalog, never the client.
    const line_items = items.flatMap((i) => {
      const p = getProduct(i.slug);
      if (!p) return [];
      return [
        {
          quantity: Math.max(1, Math.min(10, i.qty)),
          price_data: {
            currency: "usd",
            unit_amount: p.price * 100,
            product_data: {
              name: p.name + (i.size ? ` — Size ${i.size}` : ""),
              description: p.materials,
            },
          },
        },
      ];
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      success_url: `${site}/?checkout=success`,
      cancel_url: `${site}/?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "stripe_error" }, { status: 500 });
  }
}
