"use client";

import Image from "next/image";
import { useEffect, useState, MouseEvent } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { getProducts, Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

type Props = { params: { slug: string } };

export default function ProductPage({ params }: Props) {
  const searchParams = useSearchParams();
  const colorFromUrl = searchParams.get("color");

  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [color, setColor] = useState<string>("");
  const [view, setView] = useState<"front" | "back">("front");
  const [size, setSize] = useState<string>("M");
  const [quantity, setQuantity] = useState(1);

  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
    transformOrigin: "center",
  });

  useEffect(() => {
    getProducts().then((products) => {
      const found = products.find((p) => p.sin === params.slug);
      if (!found) return notFound();

      setProduct(found);
      setColor(colorFromUrl ?? found.colors[0]);
      setView("front");
    });
  }, [params.slug, colorFromUrl]);

  useEffect(() => {
    setView("front");
  }, [color]);

  if (!product) return null;

  const handleAdd = () => {
  addToCart(
    product,
    `${size}-${color}`, // size ke saath color store
    quantity
  );
};


  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid lg:grid-cols-2 gap-10">
      {/* IMAGE + ZOOM */}
      <div className="space-y-4">
        <motion.div
          className="relative aspect-[4/5] rounded-2xl overflow-hidden glass cursor-zoom-in"
          key={`${color}-${view}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            setZoomStyle({
              transform: "scale(1.8)",
              transformOrigin: `${x}% ${y}%`,
            });
          }}
          onMouseLeave={() =>
            setZoomStyle({
              transform: "scale(1)",
              transformOrigin: "center",
            })
          }
        >
          <Image
            src={`/mockups/${product.sin}/hoodie/${color}/${view}.png`}
            alt={`${product.name} ${view}`}
            fill
            priority
            className="object-cover transition-transform duration-200 ease-out"
            style={zoomStyle}
          />
        </motion.div>

        {/* FRONT / BACK */}
        <div className="flex gap-3">
          {(["front", "back"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-full
                ${
                  view === v
                    ? "border-white"
                    : "border-white/20 text-smoke hover:border-white"
                }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* DETAILS */}
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-[0.18em]">
            {product.name}
          </h1>
          <p className="text-smoke mt-2">₹{product.price}</p>
        </div>

        {/* COLOR */}
        <div>
          <p className="text-xs uppercase tracking-widest text-smoke mb-2">
            Color
          </p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-4 py-2 uppercase text-xs border rounded-full
                  ${
                    c === color
                      ? "border-white"
                      : "border-white/20 text-smoke hover:border-white"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* SIZE */}
        <div>
          <p className="text-xs uppercase tracking-widest text-smoke mb-2">
            Size
          </p>
          <div className="flex gap-2">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 uppercase text-xs border rounded-full
                  ${
                    s === size
                      ? "border-ember bg-ember/10"
                      : "border-white/20 text-smoke hover:border-ember/60"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* QUANTITY */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 border rounded-full"
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 border rounded-full"
          >
            +
          </button>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAdd}
          className="w-full rounded-full bg-gradient-to-r from-ember to-blood py-4 uppercase tracking-widest shadow-neon"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
