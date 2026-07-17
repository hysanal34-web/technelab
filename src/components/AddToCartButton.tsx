'use client'
import { useState } from 'react'
import { useCart, type CartItem } from '@/lib/cart'
import Link from 'next/link'

export function AddToCartButton({ item }: { item: CartItem }) {
  const { add, items } = useCart()
  const inCart = items.some((i) => i.id === item.id)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    add(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (inCart) {
    return (
      <Link
        href="/sepet"
        className="w-full font-mono text-[11px] tracking-[0.14em] uppercase bg-neon text-bg text-center py-3.5 hover:bg-transparent hover:text-neon border border-neon transition-all duration-200 block"
        data-hover
      >
        sepette — görüntüle →
      </Link>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full font-mono text-[11px] tracking-[0.14em] uppercase py-3.5 border border-neon transition-all duration-200 ${
        added ? 'bg-neon text-bg' : 'bg-neon text-bg hover:bg-transparent hover:text-neon'
      }`}
      data-hover
    >
      {added ? '✓ sepete eklendi' : 'sepete ekle'}
    </button>
  )
}
