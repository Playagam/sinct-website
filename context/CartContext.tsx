"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cartTotal } from "@/lib/cart";
import { Product } from "@/lib/products";

/* ================= TYPES ================= */

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  selectedColor?: string;
}

type CartContextType = {
  items: CartItem[];
  addToCart: (
    product: Product,
    size: string,
    quantity?: number,
    selectedColor?: string
  ) => void;
  removeFromCart: (id: string, size: string, selectedColor?: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    quantity: number,
    selectedColor?: string
  ) => void;
  clearCart: () => void;
  total: number;
};

/* ================= CONTEXT ================= */

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "sinct_cart_v1";

/* ================= PROVIDER ================= */

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // Save cart
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  /* ================= ACTIONS ================= */

  const addToCart = (
    product: Product,
    size: string,
    quantity = 1,
    selectedColor?: string
  ) => {
    setItems(prev => {
      const existing = prev.find(
        item =>
          item.product.id === product.id &&
          item.size === size &&
          item.selectedColor === selectedColor
      );

      if (existing) {
        return prev.map(item =>
          item.product.id === product.id &&
          item.size === size &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          size,
          quantity,
          selectedColor,
        },
      ];
    });
  };

  const removeFromCart = (
    id: string,
    size: string,
    selectedColor?: string
  ) => {
    setItems(prev =>
      prev.filter(
        item =>
          !(
            item.product.id === id &&
            item.size === size &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const updateQuantity = (
    id: string,
    size: string,
    quantity: number,
    selectedColor?: string
  ) => {
    setItems(prev =>
      prev.map(item =>
        item.product.id === id &&
        item.size === size &&
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => cartTotal(items), [items]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
    }),
    [items, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
