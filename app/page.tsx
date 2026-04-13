import Image from "next/image";
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
          <Image
          src="/hero-mobile.jpg"
          alt="SINCT hero"
          fill
          priority
          className="object-cover"
        />
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