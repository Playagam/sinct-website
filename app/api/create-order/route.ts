import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cart, customer } = await req.json();

  const amount =
    cart.reduce(
      (sum: number, i: any) => sum + i.price * i.quantity,
      0
    ) * 100;

  // 🔥 TEMP ORDER (NO RAZORPAY)
  const fakeOrder = {
    id: "temp_order_" + Date.now(),
    amount,
    currency: "INR",
    status: "created",
    customer,
    cart,
  };

  return NextResponse.json({
    order: fakeOrder,
    paymentDisabled: true,
  });
}
