"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((n, item) => n + item.quantity, 0);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-end">
        {/* CENTER LOGO (true-centered on mobile) */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-40 h-12 sm:w-48 sm:h-16"
        >
          <Image src="/logo.png" alt="SINƇT" fill priority className="object-contain" />
        </Link>

        {/* RIGHT CART */}
        <div className="flex justify-end">
          <Link
            href="/cart"
            className="relative p-3 rounded-full hover:bg-white/10 transition"
          >
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-ember text-white rounded-full px-2 py-[2px] shadow-neon">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
