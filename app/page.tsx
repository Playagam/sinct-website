import ProductGrid from "@/components/ProductGrid";
import { ReviewSection } from "@/components/ReviewSection";

export default function HomePage() {
  return (
    <>
      {/* FULL SCREEN VIDEO HERO */}
      <section className="relative h-[calc(100vh-5rem)] pt-20 w-full overflow-hidden">


        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />
      </section>

      {/* PRODUCTS */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <ProductGrid />
      </div>

      {/* REVIEWS */}
      <ReviewSection />
    </>
  );
}







