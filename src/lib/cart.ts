'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DISCOUNT_RATE, DISCOUNT_THRESHOLD } from './data'

export type CartItem = {
  id: number
  slug: string
  title: string
  sub: string
  price: number
  instructor: string
}

type CartStore = {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (id: number) => void
  clear: () => void
  subtotal: () => number
  discount: () => number
  total: () => number
  hasDiscount: () => boolean
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item) => {
        const exists = get().items.find((i) => i.id === item.id)
        if (!exists) set((s) => ({ items: [...s.items, item] }))
      },

      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      clear: () => set({ items: [] }),

      count: () => get().items.length,

      subtotal: () => get().items.reduce((sum, i) => sum + i.price, 0),

      hasDiscount: () => get().items.length >= DISCOUNT_THRESHOLD,

      discount: () => {
        const sub = get().subtotal()
        return get().hasDiscount() ? Math.round(sub * DISCOUNT_RATE) : 0
      },

      total: () => get().subtotal() - get().discount(),
    }),
    { name: 'technelab-cart' }
  )
)
