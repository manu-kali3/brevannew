import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/supabase";
import { sendEmail, newsletterThanks } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { stripCRLF } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limiter = rateLimit(`newsletter:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limiter.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(limiter.retryAfter) } }
    );
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = stripCRLF(body.email ?? "");

  const emailPattern = /^[^ @]+@[^ @]+$/;
  if (!email || !emailPattern.test(email) || email.length > 320) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  let anyDelivered = false;

  // Send the subscriber a thank-you notification. The `emails` log is
  // written inside sendEmail() with the real delivery status.
  const thanked = await sendEmail(newsletterThanks(email));
  if (thanked) anyDelivered = true;

  // Keep the Brevan Events subscriber list in sync for admin bulk email.
  const subscribed = await addSubscriber({ email, source: "newsletter" });
  if (subscribed) anyDelivered = true;

  if (!anyDelivered) {
    return NextResponse.json(
      { error: "Subscriptions are not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
