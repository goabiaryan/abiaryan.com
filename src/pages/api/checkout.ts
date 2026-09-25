import type { APIRoute } from "astro";
import Stripe from "stripe";
import { offers, type OfferId } from "../../data/advisory";
import { site } from "../../data/site";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const key = import.meta.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return new Response("Stripe is not configured.", { status: 503 });
  }

  const form = await request.formData();
  const offerId = String(form.get("offer") ?? "") as OfferId;
  const offer = offers.find((item) => item.id === offerId);
  if (!offer) {
    return new Response("Unknown offer.", { status: 400 });
  }

  const email = String(form.get("email") ?? "");
  const name = String(form.get("name") ?? "");
  const company = String(form.get("company") ?? "");
  const focus = String(form.get("focus") ?? "");
  const stack = String(form.get("stack") ?? "");

  const stripe = new Stripe(key);
  const origin = site.url.replace(/\/$/, "");
  const cancel = new URL(offer.href, `${origin}/`).href;

  const session = await stripe.checkout.sessions.create({
    mode: offer.mode,
    customer_email: email || undefined,
    success_url: `${origin}/advisory/thanks/`,
    cancel_url: cancel,
    metadata: {
      offer: offer.id,
      name,
      company,
      focus,
      stack,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: offer.cents,
          product_data: {
            name: offer.title,
            description: offer.summary,
          },
          ...(offer.mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
        },
      },
    ],
  });

  if (!session.url) {
    return new Response("Stripe did not return a checkout URL.", { status: 502 });
  }

  return new Response(null, {
    status: 303,
    headers: { Location: session.url },
  });
};
