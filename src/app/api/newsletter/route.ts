import { NextResponse } from "next/server";
import { storeEmail, addSubscriber } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";

  const emailPattern = /^[^ @]+@[^ @]+$/;
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const logged = await storeEmail({
    type: "newsletter",
    from: "Footer newsletter form",
    to: email,
    subject: "Newsletter subscription",
    body: email,
    delivered: true,
  });

  // Keep the Brevan Events subscriber list in sync for admin bulk email.
  const subscribed = await addSubscriber({ email, source: "newsletter" });

  if (!logged && !subscribed) {
    return NextResponse.json(
      { error: "Subscriptions are not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
