"use client";

import { reviews } from "@/lib/reviews";
import { motion } from "framer-motion";

export const ReviewSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase text-smoke/60">Voices of SINƇT</p>
          <h2 className="font-display text-3xl tracking-[0.16em]">Customer reviews</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            className="glass noise rounded-xl p-4 border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-display tracking-[0.16em] text-lg">{review.name}</p>
                <p className="text-xs text-smoke/70">{review.handle}</p>
              </div>
              <div className="text-ember text-sm">{Array.from({ length: review.rating }).map(() => "★").join("")}</div>
            </div>
            <p className="text-smoke/80 text-sm leading-relaxed">{review.comment}</p>
            <p className="mt-3 text-xs uppercase text-smoke/60">Drop: {review.drop}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};




