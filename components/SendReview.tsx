"use client";

import { useState } from "react";
import { sins } from "@/lib/products";

export default function SendReview() {
  const [name, setName] = useState("");
  const [drop, setDrop] = useState(sins[0] ?? "pride");
  const [rating, setRating] = useState<number>(5);
  const [note, setNote] = useState("");

  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/review-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          drop,
          rating,
          note,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to send review");
      }

      setStatus("sent");
      setName("");
      setNote("");
      setDrop(sins[0] ?? "pride");
      setRating(5);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Something went wrong");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="glass noise rounded-2xl p-5 border border-white/5">
        <div className="mb-4">
          <p className="text-xs uppercase text-smoke/60">Send a review</p>
          <h3 className="font-display text-2xl tracking-[0.14em]">
            Drop your review
          </h3>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="space-y-2 block">
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

          <div className="grid sm:grid-cols-2 gap-3">
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
              placeholder="Write your review..."
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              disabled={status === "sending"}
              className="rounded-full bg-gradient-to-r from-ember to-blood px-5 py-3 uppercase tracking-[0.16em] shadow-neon disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send review"}
            </button>

            {status === "sent" && (
              <span className="text-xs uppercase tracking-[0.16em] text-white/80">
                Sent
              </span>
            )}
            {status === "error" && (
              <span className="text-xs uppercase tracking-[0.16em] text-blood">
                {error ?? "Failed"}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

