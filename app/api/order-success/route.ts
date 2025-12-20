import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      addressLine,
      city,
      state,
      pincode,
      items,
      totalAmount,
      orderId,
      paymentId,
    } = body;

    // 🔔 ADMIN EMAIL
    await resend.emails.send({
      from: "SINCT <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `🧾 New Order – ${orderId}`,
      html: `
        <h2>New Order Received</h2>
        <p><b>Name:</b> ${customerName}</p>
        <p><b>Email:</b> ${customerEmail}</p>
        <p><b>Phone:</b> ${customerPhone}</p>
        <p><b>Address:</b> ${addressLine}, ${city}, ${state} - ${pincode}</p>
        <p><b>Payment ID:</b> ${paymentId}</p>
        <p><b>Total:</b> ₹${totalAmount}</p>
        <pre>${JSON.stringify(items, null, 2)}</pre>
      `,
    });

    // 📩 CUSTOMER EMAIL
    await resend.emails.send({
      from: "SINCT <onboarding@resend.dev>",
      to: customerEmail,
      subject: "🖤 Your SINCT Order is Confirmed",
      html: `
        <h1>Order Confirmed</h1>
        <p>Hey ${customerName},</p>
        <p>Your order <b>${orderId}</b> has been placed successfully.</p>
        <p><b>Total:</b> ₹${totalAmount}</p>
        <p>We’ll ship it soon.</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("ORDER EMAIL ERROR:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
