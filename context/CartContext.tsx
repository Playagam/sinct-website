"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, cartTotal } from "@/lib/cart";
import { Product } from "@/lib/products";

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "sinct_cart_v1";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setItems(prev => prev.filter(item => !(item.product.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.product.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => cartTotal(items), [items]);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};




