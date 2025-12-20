import { Product } from "./products";

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);




