"use client";

import Link from "next/link";

import { useFavorites } from "@/context/FavoriteContext";
import ProductCard from "@/components/ProductCard";

export default function FavoritesPage() {
  const { favoriteItems } = useFavorites();

  return (
    <main className="p-4 sm:p-6">

      
      <h1 className="mb-6 text-2xl font-bold text-black sm:text-3xl">
        Favorites
      </h1>

      
      {favoriteItems.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center">

          <p className="text-lg text-gray-700">
            You have no favorite products.
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Browse Products
          </Link>

        </div>
      ) : (

        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">

          {favoriteItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      )}
    </main>
  );
}