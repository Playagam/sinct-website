import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Server is missing RESEND_API_KEY. Add it to .env.local and restart the dev server.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing name, email, or message" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address. Please use email@example.com format.",
        },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_EMAIL || "sinct2006@gmail.com";

    const resend = new Resend(apiKey);
    const from =
      process.env.RESEND_FROM || "SINCT Contact <onboarding@resend.dev>";

    const subject = `📩 New message from ${name}`;
    const html = `
      <h1>New Contact Message</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">${escapeHtml(
        message
      )}</pre>
    `;

    const text = `New Contact Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: `${sanitizeHeaderName(name)} <${email}>`,
      subject,
      html,
      text,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("CONTACT EMAIL ERROR:", err);
    return NextResponse.json(
      { success: false, message: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  // Lightweight validation: enough to catch obvious bad inputs.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeHeaderName(name: string) {
  // Prevent breaking "Name <email>" formatting.
  return name.replaceAll(/[\r\n<>"]/g, "").trim() || "Customer";
}
