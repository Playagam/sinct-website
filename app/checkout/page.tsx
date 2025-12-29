"use client";

import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { cartTotal, formatPrice } from "@/lib/cart";
import { loadRazorpay } from "@/lib/razorpay";
import { useRouter } from "next/navigation";

const coupons: Record<string, number> = {
  SINS10: 0.1,
  DEVIL20: 0.2,
};

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  // CUSTOMER FORM STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("India");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => cartTotal(items), [items]);
  const total = Math.max(0, subtotal - subtotal * discount);

  const handleCoupon = () => {
    const key = coupon.toUpperCase();
    if (coupons[key]) setDiscount(coupons[key]);
  };

  // 🔴 PREPAID (RAZORPAY)
  const handlePay = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!items.length) return;

    setLoading(true);
    const ready = await loadRazorpay();
    if (!ready) {
      setLoading(false);
      return;
    }

    const orderRes = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(total * 100) }),
    });

    const order = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency,
      name: "SINCT",
      description: "Hoodie Order",
      order_id: order.id,

      handler: async (response: any) => {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethod: "Prepaid",
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            cart: items,
            customer: {
              name,
              email,
              phone,
              address: street,
              city,
              state,
              zip,
              country,
            },
          }),
        });

        clearCart();
        router.push("/success");
      },

      prefill: { name, email, contact: phone },
      theme: { color: "#9b111e" },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  // 🟢 CASH ON DELIVERY
  const handleCOD = async () => {
    if (!items.length) return;

    setLoading(true);

    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethod: "COD",
        cart: items,
        customer: {
          name,
          email,
          phone,
          address: street,
          city,
          state,
          zip,
          country,
        },
      }),
    });

    clearCart();
    router.push("/success");
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-4xl tracking-[0.16em] mb-6">
        Checkout
      </h1>

      <form className="grid lg:grid-cols-2 gap-8" onSubmit={handlePay}>
        {/* ADDRESS */}
        <div className="space-y-4">
          <h2 className="text-lg uppercase tracking-[0.16em] text-smoke/70">
            Address
          </h2>

          <input required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="input" />
          <input required placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
          <input required placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="input" />
          <input required placeholder="Street Address" value={street} onChange={e => setStreet(e.target.value)} className="input" />

          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="City" value={city} onChange={e => setCity(e.target.value)} className="input" />
            <input required placeholder="State" value={state} onChange={e => setState(e.target.value)} className="input" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="ZIP" value={zip} onChange={e => setZip(e.target.value)} className="input" />
            <input placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} className="input" />
          </div>
        </div>

        {/* ORDER */}
        <div className="space-y-4">
          <div className="glass noise border border-white/5 rounded-xl p-4">
            {items.map(item => (
              <div key={`${item.product.sin}-${item.size}`} className="flex justify-between text-sm">
                <span>
                  {item.product.name} · {item.selectedColor} · {item.size} × {item.quantity}
                </span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}

            <div className="mt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* PREPAID */}
          <button
            type="submit"
            disabled={loading || !items.length}
            className="w-full rounded-full bg-gradient-to-r from-ember to-blood px-5 py-3 uppercase tracking-[0.16em] shadow-neon disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>

          {/* COD */}
          <button
            type="button"
            onClick={handleCOD}
            disabled={loading || !items.length}
            className="w-full rounded-full border border-white/20 px-5 py-3 uppercase tracking-[0.16em] hover:border-ember/80 transition"
          >
            Pay Cash on Delivery
          </button>
        </div>
      </form>
    </div>
  );
}
