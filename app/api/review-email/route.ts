import { NextResponse } from "next/server";
import { Resend } from "resend";

const sins = [
  "pride",
  "greed",
  "lust",
  "envy",
  "gluttony",
  "wrath",
  "sloth",
] as const;

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
    const drop = String(body?.drop ?? "").trim().toLowerCase();
    const rating = Number(body?.rating);
    const note = String(body?.note ?? "").trim();

    if (!name || !drop || !Number.isFinite(rating)) {
      return NextResponse.json(
        { success: false, message: "Missing name, drop, or rating" },
        { status: 400 }
      );
    }

    if (!sins.includes(drop as any)) {
      return NextResponse.json(
        { success: false, message: "Invalid drop" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be 1 to 5" },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_EMAIL || "sinct2006@gmail.com";
    const from = process.env.RESEND_FROM || "SINCT <no-reply@sinct.in>";

    const resend = new Resend(apiKey);

    const subject = `⭐ New Review — ${drop.toUpperCase()} (${rating}/5)`;
    const html = `
      <h1>New Review</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Drop:</strong> ${escapeHtml(drop.toUpperCase())}</p>
      <p><strong>Rating:</strong> ${"★".repeat(rating)} (${rating}/5)</p>
      ${
        note
          ? `<p><strong>Note:</strong></p><pre style="white-space:pre-wrap;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">${escapeHtml(
              note
            )}</pre>`
          : "<p><strong>Note:</strong> (none)</p>"
      }
    `;

    const text = `New Review\n\nName: ${name}\nDrop: ${drop.toUpperCase()}\nRating: ${rating}/5\n\nNote:\n${note || "(none)"}\n`;

    const { data, error } = await resend.emails.send({
      from,
      to,
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
    return NextResponse.json(
      { success: false, message: err?.message ?? "Server error" },
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

