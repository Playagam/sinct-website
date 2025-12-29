import { NextResponse } from "next/server";
import { forwardToAppsScript } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await forwardToAppsScript("/products", body);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
