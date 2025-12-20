export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-4">
      <h1 className="font-display text-4xl tracking-[0.16em]">Contact SINƇT</h1>
      <p className="text-smoke/80">
        Hit us for collabs, wholesale, or support. We respond in 24 hours.
      </p>
      <form className="space-y-3">
        <input required placeholder="Name" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3" />
        <input required type="email" placeholder="Email" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3" />
        <textarea required rows={5} placeholder="Message" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3" />
        <button className="rounded-full bg-gradient-to-r from-ember to-blood px-5 py-3 uppercase tracking-[0.16em] shadow-neon">
          Send
        </button>
      </form>
    </div>
  );
}




