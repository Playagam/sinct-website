"use client";

import { useEffect, useMemo, useState } from "react";
import { getProducts, Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type Tab = "winter" | "summer" | "new" | "trending";

export default function HomeDrops() {
  const [tab, setTab] = useState<Tab>("winter");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const winter = useMemo(
  () => products.filter((p) => p.category === "hoodie"),
  [products]
  );

  const summer = useMemo(
  () => products.filter((p) => p.category === "tshirt"),
  [products]
  );
  const trending = useMemo(() => products.slice(0, 3), [products]);
  const newArrivals = useMemo(() => products.slice(0, 3), [products]);

  const shown =
  tab === "winter"
    ? winter
    : tab === "summer"
    ? summer
    : tab === "trending"
    ? trending
    : tab === "new"
    ? newArrivals
    : [];

  return (
    <section aria-label="Drops" className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
         <TabButton active={tab === "summer"} onClick={() => setTab("summer")}>
            Summer drop
         </TabButton>
         <TabButton active={tab === "winter"} onClick={() => setTab("winter")}>
           Winter drop
         </TabButton>
          <TabButton active={tab === "new"} onClick={() => setTab("new")}>
            New arrivals
         </TabButton>
          <TabButton
           active={tab === "trending"}
           onClick={() => setTab("trending")}
         >
          Trending
          </TabButton>
        </div>
     </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shown.map((product) => (
         <ProductCard key={product.slug} product={product} />
        ))}
     </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] border transition",
        active
          ? "border-ember bg-ember/10 text-white shadow-neon"
          : "border-white/10 bg-black/20 text-smoke hover:border-white/25 hover:bg-white/5",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

