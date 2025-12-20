"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/cart";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50, 150], [8, 0, -8]), { stiffness: 120 });
  const rotateY = useSpring(useTransform(x, [-150, 0, 150], [12, 0, -12]), { stiffness: 120 });

  const handleMouse = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left - rect.width / 2;
    const py = event.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div
        className="group relative border border-white/5 rounded-2xl overflow-hidden glass noise"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
      >
        {/* BACK IMAGE FIXED */}
        <div
          className="h-72 bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${product.images.back})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition" />
          {product.badge && (
            <span className="absolute top-4 right-4 text-[10px] uppercase bg-ember px-3 py-1 rounded-full shadow-neon">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="font-display text-xl tracking-[0.12em]">{product.name}</p>
            <p className="text-xs uppercase text-smoke/70">{product.sin}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-smoke/80">from</p>
            <p className="text-lg">{formatPrice(product.price)}</p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-12 translate-y-full group-hover:translate-y-0 transition">
          <div className="h-full bg-gradient-to-r from-ember to-blood text-center flex items-center justify-center text-xs uppercase tracking-[0.18em]">
            View Product
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
