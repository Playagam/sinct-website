import { NextResponse } from "next/server";
import { forwardToAppsScript } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await forwardToAppsScript("/products", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
