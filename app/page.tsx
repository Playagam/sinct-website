import HomeDrops from "@/components/HomeDrops";
import { ReviewSection } from "@/components/ReviewSection";
import SendReview from "@/components/SendReview";

export default function HomePage() {
  return (
    <>
      {/* FULL SCREEN VIDEO HERO */}
      <section className="relative w-full overflow-hidden">
        {/* Desktop/Tablet: show video */}
        <div className="relative hidden md:block h-[100svh]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Mobile: no video (fallback hero) */}
        <div className="relative md:hidden h-[70svh]">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-night to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,60,56,0.22),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(155,17,30,0.18),transparent_40%)]" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      </section>

      {/* PRODUCTS */}
      <div id="sins" className="mx-auto max-w-6xl px-4 py-12">
        <HomeDrops />
      </div>

      {/* REVIEWS */}
      <ReviewSection />
      <SendReview />
    </>
  );
}