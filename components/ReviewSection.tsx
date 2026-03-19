"use client";

export const ReviewSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase text-smoke/60">Voices of SINƇT</p>
          <h2 className="font-display text-3xl tracking-[0.16em]">Customer reviews</h2>
        </div>
      </div>
      <div className="glass noise rounded-2xl p-8 border border-white/5 text-center">
        <p className="font-display text-2xl tracking-[0.14em]">No reviews yet</p>
        <p className="mt-2 text-sm text-smoke/80">
          Be the first to drop your review below.
        </p>
      </div>
    </section>
  );
};




