"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, cartTotal } from "@/lib/cart";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center space-y-4">
        <h1 className="font-display text-4xl tracking-[0.16em]">Cart is empty</h1>
        <Link href="/" className="text-sm uppercase tracking-[0.16em] underline">
          Browse drops
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="font-display text-4xl tracking-[0.16em]">Your Cart</h1>
      <div className="space-y-4">
        {items.map(item => (
          <div key={`${item.product.id}-${item.size}`} className="glass noise border border-white/5 rounded-xl p-4 flex flex-wrap items-center gap-4">
            <div className="flex-1">
              <p className="font-display text-xl tracking-[0.12em]">{item.product.name}</p>
              <p className="text-xs uppercase text-smoke/60">
                {item.product.category} · Size {item.size}
              </p>
              <p className="text-smoke/80">{formatPrice(item.product.price)}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateQuantity(item.product.id, item.size, Math.max(1, item.quantity - 1))}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-ember/70"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-ember/70"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.product.id, item.size)}
              className="text-xs uppercase tracking-[0.16em] text-smoke/70 hover:text-ember"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg text-smoke/80">Total</p>
        <p className="text-2xl">{formatPrice(cartTotal(items))}</p>
      </div>
      <Link
        href="/checkout"
        className="inline-flex justify-center w-full rounded-full bg-gradient-to-r from-ember to-blood px-5 py-3 uppercase tracking-[0.16em] shadow-neon"
      >
        Checkout
      </Link>
    </div>
  );
}




