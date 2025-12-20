"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { getProducts, Product } from "@/lib/products";

type Props = {
  sin?: string; // optional filter
};

export default function ProductGrid({ sin }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<Record<string, string>>({});

  useEffect(() => {
    getProducts().then((data) => {
      const filtered = sin ? data.filter((p) => p.sin === sin) : data;
      setProducts(filtered);

      const defaults: Record<string, string> = {};
      filtered.forEach((p) => {
        defaults[p.sin] = p.colors[0];
      });
      setSelectedColor(defaults);
    });
  }, [sin]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const color = selectedColor[product.sin];

        return (
          <motion.div
            key={product.sin}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-4 group"
          >
            {/* PRODUCT IMAGE */}
            <Link href={`/product/${product.sin}?color=${color}`}>
              <div className="relative w-full h-[360px] overflow-hidden rounded-xl cursor-pointer">
                <Image
                  src={`/mockups/${product.sin}/hoodie/${color}/back.png`}
                  alt={`${product.name} hoodie back`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* INFO */}
            <div className="mt-4">
              <h3 className="uppercase tracking-widest text-sm font-semibold">
                {product.name}
              </h3>
              <p className="text-xs text-smoke mt-1">₹{product.price}</p>

              {/* COLOR SELECTOR */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() =>
                      setSelectedColor((prev) => ({
                        ...prev,
                        [product.sin]: c,
                      }))
                    }
                    className={`px-3 py-1 text-xs uppercase border rounded transition
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
          </motion.div>
        );
      })}
    </div>
  );
}
