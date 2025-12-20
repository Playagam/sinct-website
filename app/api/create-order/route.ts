import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { cart, customer } = await req.json();

  const amount =
    cart.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0) * 100;

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `sinct_${Date.now()}`,
    notes: {
      customer: JSON.stringify(customer),
      cart: JSON.stringify(cart),
    },
  });

  return NextResponse.json({ order });
}
