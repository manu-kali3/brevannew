import { NextResponse } from "next/server";
import { Resend } from "resend";
import { storeLead } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const toEmail = process.env.CONTACT_EMAIL ?? "brevansoftwares@gmail.com";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const service = body.service?.trim() ?? "";

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please provide your name and email address." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^ @]+@[^ @]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  let anyDelivered = false;

  const stored = await storeLead({
    type: "quote",
    name,
    email,
    subject,
    service,
  });
  if (stored) anyDelivered = true;

  if (resend) {
    const { error } = await resend.emails.send({
      from: "Brevan Softwares Website <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `Quote Request: ${subject || service || "New Quote Request"}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        `Service Needed: ${service}`,
      ].join("\n"),
    });
    if (!error) anyDelivered = true;
    else console.error("Resend error:", error);
  }

  if (!anyDelivered) {
    return NextResponse.json(
      { error: "Submissions are not configured yet. Please contact us by email." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
