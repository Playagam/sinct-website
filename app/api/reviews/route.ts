import { NextResponse } from "next/server";
import { forwardToAppsScript } from "@/lib/sheets";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { reviews: [], warning: "Missing NEXT_PUBLIC_APPS_SCRIPT_URL" },
        { status: 200 }
      );
    }

    // Expect Apps Script to support GET /reviews returning { reviews: [...] } or an array.
    const res = await fetch(`${baseUrl}/reviews`, {
      method: "GET",
      headers: { "Accept": "application/json" },
      cache: "no-store",
    });

    const raw = await res.text();
    const data = raw ? safeJsonParse(raw) : null;
    if (!res.ok) {
      return NextResponse.json(
        { reviews: [], warning: data?.error || raw || "Failed to fetch reviews" },
        { status: 200 }
      );
    }

    const reviews = Array.isArray(data) ? data : data?.reviews;
    if (!Array.isArray(reviews)) {
      // If we got HTML or unknown payload, surface as warning.
      return NextResponse.json({
        reviews: [],
        warning:
          typeof raw === "string" && raw.trim().startsWith("<")
            ? "Apps Script returned HTML (check deployment access / URL)."
            : "Apps Script returned an unexpected payload.",
      });
    }

    return NextResponse.json({ reviews });
  } catch (err: any) {
    return NextResponse.json(
      { reviews: [], warning: err?.message || "Server error" },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await forwardToAppsScript("/reviews", body);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Server Error" },
      { status: 500 }
    );
  }
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

