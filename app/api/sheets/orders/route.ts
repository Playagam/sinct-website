import { NextResponse } from "next/server";
import { forwardToAppsScript } from "@/lib/sheets";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const data = await forwardToAppsScript(process.env.APPS_SCRIPT_ORDERS_URL, body);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




