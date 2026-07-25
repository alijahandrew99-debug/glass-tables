"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string | null;
  qty: number;
}

interface CartState {
  items: CartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (slug: string, size: string | null) => void;
  setQty: (slug: string, size: string | null, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (item) =>
        set((s) => {
          const i = s.items.findIndex(
            (x) => x.slug === item.slug && x.size === item.size
          );
          if (i >= 0) {
            const items = [...s.items];
            items[i] = { ...items[i], qty: items[i].qty + 1 };
            return { items, open: true };
          }
          return { items: [...s.items, { ...item, qty: 1 }], open: true };
        }),
      remove: (slug, size) =>
        set((s) => ({
          items: s.items.filter((x) => !(x.slug === slug && x.size === size)),
        })),
      setQty: (slug, size, qty) =>
        set((s) => ({
          items: s.items
            .map((x) =>
              x.slug === slug && x.size === size ? { ...x, qty } : x
            )
            .filter((x) => x.qty > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "glass-tables-bag", partialize: (s) => ({ items: s.items }) }
  )
);

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0);
