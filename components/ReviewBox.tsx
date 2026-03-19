"use client";

import { useEffect, useMemo, useState } from "react";
import { sins } from "@/lib/products";

type PublicReview = {
  id?: string;
  name?: string;
  sin?: string;
  rating?: number;
  note?: string;
  createdAt?: string;
};

export default function ReviewBox() {
  const [name, setName] = useState("");
  const [drop, setDrop] = useState(sins[0] ?? "pride");
  const [rating, setRating] = useState<number>(5);
  const [note, setNote] = useState("");

  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const [publicReviews, setPublicReviews] = useState<PublicReview[]>([]);
  const approvedReviews = useMemo(
    () =>
      publicReviews
        .filter((r) => Number(r.rating) >= 4)
        .slice()
        .reverse(),
    [publicReviews]
  );

  const loadReviews = async () => {
    const res = await fetch("/api/reviews", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (Array.isArray(data?.reviews)) setPublicReviews(data.reviews);
  };

  useEffect(() => {
    loadReviews().catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const payload = {
        name: name.trim(),
        sin: drop,
        rating,
        note: note.trim(),
        createdAt: new Date().toISOString(),
      };

      if (!payload.name) {
        throw new Error("Please enter your name.");
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) {
        throw new Error(data?.error || "Failed to submit review");
      }

      setStatus("submitted");
      setNote("");
      setName("");

      // Auto-post rule: rating >= 4 should appear publicly.
      if (rating >= 4) {
        setPublicReviews((prev) => [
          ...prev,
          { id: crypto.randomUUID(), ...payload },
        ]);
      }

      // Also refresh from backend (if supported) so all users see the same list.
      loadReviews().catch(() => {});
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Something went wrong");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <div>
        <p className="text-xs uppercase text-smoke/60">Drop your review</p>
        <h2 className="font-display text-3xl tracking-[0.16em]">
          Tell SINƇT how it hit
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <form
          onSubmit={submit}
          className="glass noise rounded-2xl p-5 border border-white/5 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-xs uppercase tracking-[0.18em] text-smoke/70">
                Name
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.18em] text-smoke/70">
                Select drop (sin)
              </span>
              <select
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 uppercase tracking-widest text-xs"
              >
                {sins.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.18em] text-smoke/70">
                Star rating
              </span>
              <div className="flex gap-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={[
                      "text-lg leading-none",
                      n <= rating ? "text-ember" : "text-white/25",
                    ].join(" ")}
                    aria-label={`${n} star`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </label>
          </div>

          <label className="space-y-2 block">
            <span className="text-xs uppercase tracking-[0.18em] text-smoke/70">
              Note (optional)
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Tell us what you loved (fit, print, quality, delivery...)"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              disabled={status === "submitting"}
              className="rounded-full bg-gradient-to-r from-ember to-blood px-5 py-3 uppercase tracking-[0.16em] shadow-neon disabled:opacity-60"
            >
              {status === "submitting" ? "Posting..." : "Post review"}
            </button>

            {status === "submitted" && (
              <span className="text-xs uppercase tracking-[0.16em] text-white/80">
                Submitted
              </span>
            )}
            {status === "error" && (
              <span className="text-xs uppercase tracking-[0.16em] text-blood">
                {error ?? "Failed"}
              </span>
            )}
          </div>

        </form>

        <div className="glass noise rounded-2xl p-5 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase text-smoke/60">
                Public reviews (4★+)
              </p>
              <h3 className="font-display text-2xl tracking-[0.14em]">
                Community
              </h3>
            </div>
            <button
              type="button"
              onClick={() => loadReviews()}
              className="text-xs uppercase tracking-[0.18em] text-smoke hover:text-white transition"
            >
              Refresh
            </button>
          </div>

          {approvedReviews.length === 0 ? (
            <p className="text-smoke/70 text-sm">
              No public reviews yet. Be the first to drop a 4★+ review.
            </p>
          ) : (
            <div className="space-y-3">
              {approvedReviews.slice(0, 12).map((r, idx) => (
                <div
                  key={r.id ?? `${r.sin}-${r.createdAt}-${idx}`}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-smoke/70">
                        {String(r.sin ?? "").toUpperCase()}
                      </p>
                      {r.name ? (
                        <p className="text-[11px] text-smoke/70 mt-1">
                          {r.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="text-ember text-sm">
                      {Array.from({ length: Number(r.rating) || 0 })
                        .map(() => "★")
                        .join("")}
                    </div>
                  </div>
                  {r.note ? (
                    <p className="mt-2 text-sm text-smoke/85 leading-relaxed">
                      {r.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

