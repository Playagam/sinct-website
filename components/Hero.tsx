"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 noise pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="uppercase tracking-[0.35em] text-smoke/70 text-xs">Devilish streetwear</p>
          <h1 className="font-display text-5xl sm:text-6xl tracking-[0.12em] leading-tight">
            SINƇT / Seven
            <span className="text-ember"> Deadly Sins</span> drop
          </h1>
          <p className="text-smoke/80 max-w-xl">
            A Gen-Z capsule engineered in midnight palettes, neon blood gradients, and tactile
            hardware. Every piece is a tribute to the sin you wear proudly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/collection/pride"
              className="inline-flex items-center space-x-2 rounded-full px-5 py-3 bg-gradient-to-r from-ember to-blood shadow-neon text-sm uppercase tracking-[0.16em]"
            >
              <Flame size={16} />
              <span>Shop Pride</span>
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center space-x-2 rounded-full px-5 py-3 border border-white/10 hover:border-ember/70 transition text-sm uppercase tracking-[0.16em]"
            >
              <span>Fast Checkout</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="glass noise rounded-3xl p-1 shadow-neon">
            <motion.div
              className="rounded-3xl h-[420px] bg-cover bg-center relative overflow-hidden gradient-border"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80)"
              }}
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-2xl tracking-[0.16em]">SINƇT</p>
                  <p className="text-xs uppercase text-smoke/70">GEN-RAGE INSPIRED</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-[0.2em]">
                  3D Hover
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

