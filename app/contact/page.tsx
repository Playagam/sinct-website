"use client";

import { useState } from "react";
import { Instagram } from "lucide-react";

const INSTAGRAM_URL =
  "https://www.instagram.com/sinct.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to send message");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-4">
      <h1 className="font-display text-4xl tracking-[0.16em]">Contact SINƇT</h1>
      <p className="text-smoke/80">
        Hit us for collabs, wholesale, or support. We respond in 24 hours.
      </p>

      <div className="flex items-center gap-3 pt-1">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 hover:bg-white/5 transition"
        >
          <Instagram size={18} />
          <span className="text-xs uppercase tracking-[0.16em]">
            Connect on Instagram
          </span>
        </a>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
        />
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
        />

        <div className="flex items-center gap-3">
          <button
            disabled={status === "sending"}
            className="rounded-full bg-gradient-to-r from-ember to-blood px-5 py-3 uppercase tracking-[0.16em] shadow-neon disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send"}
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
  );
}




