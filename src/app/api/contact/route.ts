import { NextResponse } from "next/server";
import { storeLead } from "@/lib/supabase";
import { sendEmail, ownerNotification, autoresponse } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please provide your name, email and message." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^ @]+@[^ @]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  let anyDelivered = false;

  const stored = await storeLead({ type: "contact", name, email, phone, subject, message });
  if (stored) anyDelivered = true;

  const notified = await sendEmail(
    ownerNotification("contact", { name, email, phone, subject }, message)
  );
  if (notified) anyDelivered = true;

  const auto = await sendEmail(autoresponse("contact", name, email));
  if (auto) anyDelivered = true;

  if (!anyDelivered) {
    return NextResponse.json(
      { error: "Submissions are not configured yet. Please contact us by email." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
