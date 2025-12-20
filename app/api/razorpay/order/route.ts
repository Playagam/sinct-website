import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const amount = body.amount ?? 0;

  // In production, generate an order with Razorpay server SDK using key secret.
  const fakeOrder = {
    id: `order_${Math.random().toString(36).slice(2)}`,
    amount,
    currency: "INR"
  };

  return NextResponse.json(fakeOrder);
}




