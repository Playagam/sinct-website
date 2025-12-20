import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, customer, paymentMethod = "COD" } = body;

    if (!customer?.email) {
      return NextResponse.json(
        { success: false, message: "Customer email missing" },
        { status: 400 }
      );
    }

    const itemsHtml = cart
      .map(
        (item: any) => `
        <li>
          ${item.product.name} |
          Color: ${item.selectedColor} |
          Size: ${item.size} |
          Qty: ${item.quantity}
        </li>
      `
      )
      .join("");

    /* ================= ADMIN EMAIL ================= */
    await resend.emails.send({
      from: "SINCT Orders <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `🔥 New ${paymentMethod} Order — SINCT`,
      html: `
        <h1>New Order Received</h1>

        <h2>Customer</h2>
        <p>
          ${customer.name}<br/>
          ${customer.email}<br/>
          ${customer.phone}
        </p>

        <h2>Address</h2>
        <p>
          ${customer.address}<br/>
          ${customer.city}, ${customer.state}<br/>
          ${customer.zip}, ${customer.country}
        </p>

        <h2>Payment</h2>
        <p>${paymentMethod}</p>

        <h2>Items</h2>
        <ul>${itemsHtml}</ul>
      `,
    });

    /* ================= CUSTOMER EMAIL ================= */
    await resend.emails.send({
      from: "SINCT <onboarding@resend.dev>",
      to: customer.email,
      subject: "🖤 Your SINCT Order is Confirmed",
      html: `
        <h1>Order Confirmed</h1>
        <p>Thank you for choosing SINCT.</p>

        <h2>Your Order</h2>
        <ul>${itemsHtml}</ul>

        <p><strong>Payment Method:</strong> ${paymentMethod}</p>

        <p>
          We’ll notify you once your order is shipped.<br/>
          <em>Keep trying your sins.</em>
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("EMAIL ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
