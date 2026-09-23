"use client";

import Link from "next/link";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoriteContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(product.id);

  function handleFavorite() {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm">

      {/* Favorite */}
      <button
        onClick={handleFavorite}
        className="absolute right-3 top-3 z-10 text-2xl transition hover:scale-110"
        aria-label="Add to favorites"
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      {/* Product Link */}
      <Link href={`/products/${product.id}`}>
        {/* Image */}
        <div className="flex h-48 w-full items-center justify-center sm:h-52">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full cursor-pointer object-contain"
          />
        </div>

        {/* Title */}
        <div className="mt-4">
          <h2 className="line-clamp-2 min-h-[56px] text-lg font-semibold text-gray-900">
            {product.title}
          </h2>
        </div>
      </Link>

      {/* Product Information */}
      <div className="mt-2 flex flex-1 flex-col">

        {/* Description */}
        <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-gray-700">
          {product.description}
        </p>

        {/* Category */}
        <p className="mt-2 text-sm text-gray-700">
          Category: {product.category}
        </p>

        {/* Price */}
        <p className="mt-3 text-xl font-bold text-gray-900">
          ${product.price}
        </p>

        {/* Add To Cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}