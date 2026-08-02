import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const toEmail = process.env.CONTACT_EMAIL ?? "brevansoftwares@gmail.com";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 }
    );
  }

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

  const { error } = await resend.emails.send({
    from: "Brevan Softwares Website <onboarding@resend.dev>",
    to: [toEmail],
    replyTo: email,
    subject: `New Message: ${subject || "Contact Form"}`,
    text: [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
