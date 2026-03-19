export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-4">
      <h1 className="font-display text-4xl tracking-[0.16em]">
        The People Behind SINƇT
      </h1>

      <p className="text-smoke/80">
        Sinct was built by three minds with one shared vision —<br />
        to turn human nature into something you can wear.
      </p>

      <div className="pt-2 space-y-6">
        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-smoke/70">
            Founder
          </p>
          <h2 className="font-display text-2xl tracking-[0.14em]">
            Hitesh Pathania
          </h2>
          <p className="text-smoke/80">
            The idea of SINƇT started here — from the name to the vision.
            <br />
            Driven by the thought of creating something different, something
            real.
          </p>
        </section>

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-smoke/70">
            Co-Founders
          </p>

          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-display text-2xl tracking-[0.14em]">
                Agam Khurana
              </h2>
              <p className="text-smoke/80">
                Bringing structure to the vision — building the website and
                shaping how SINƇT exists digitally.
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-2xl tracking-[0.14em]">
                Tanishq Jain
              </h2>
              <p className="text-smoke/80">
                Shaping the soul of the brand — defining what SINƇT represents
                and the message it carries.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}




