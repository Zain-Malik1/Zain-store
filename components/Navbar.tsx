"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoriteContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorites();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const favoriteCount = favoriteItems.length;

  return (
    <nav className="sticky top-0 z-50 flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">

      
      <Link
        href="/?page=1"
        className="text-xl font-bold tracking-tight text-slate-900 transition hover:text-indigo-600"
      >
        Abu-Zena Store
      </Link>

      
      <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-4">

        
        <Link
          href="/?page=1"
          className="flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 sm:flex-none sm:px-4 sm:text-base"
        >
          Home
        </Link>

       
        <Link
          href="/favorites"
          className="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 sm:flex-none sm:gap-2 sm:px-4 sm:text-base"
        >
          <span className="text-xl">❤️</span>

          <span>Favorites</span>

          <span className="rounded-full bg-indigo-600 px-2 py-1 text-xs text-white">
            {favoriteCount}
          </span>
        </Link>

        
        <Link
          href="/cart"
          className="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 sm:flex-none sm:gap-2 sm:px-4 sm:text-base"
        >
          <span className="text-xl">🛒</span>

          <span>Cart</span>

          <span className="rounded-full bg-indigo-600 px-2 py-1 text-xs text-white">
            {cartCount}
          </span>
        </Link>

      </div>
    </nav>
  );
}