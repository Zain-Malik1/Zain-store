"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { Product } from "@/types/product";

import Loading from "@/components/Loading";

import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoriteContext";

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const router = useRouter();

  const { addToCart } = useCart();

  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useFavorites();

  const [product, setProduct] = useState<Product | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      setError("");

      try {
        const { id } = await params;

        const response = await api.get<Product>(
          `/products/${id}`
        );

        setProduct(response.data);
        setSelectedImage(response.data.thumbnail);
      } catch (error) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [params]);

  /* Loading */
  if (loading) {
    return <Loading />;
  }

  /* Error */
  if (error) {
    return (
      <main className="p-6">
        <div className="rounded-lg bg-white p-6 text-center">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      </main>
    );
  }

  /* Product Not Found */
  if (!product) {
    return (
      <main className="p-6">
        <div className="rounded-lg bg-white p-6 text-center">
          <p className="text-gray-700">
            Product not found.
          </p>
        </div>
      </main>
    );
  }

  const currentProduct: Product = product;

  /* Original Price */
  const originalPrice =
    currentProduct.price /
    (1 - currentProduct.discountPercentage / 100);

  /* Favorite */
  const favorite = isFavorite(currentProduct.id);

  function handleFavorite() {
    if (favorite) {
      removeFromFavorites(currentProduct.id);
    } else {
      addToFavorites(currentProduct);
    }
  }

  /* Add To Cart */
  function handleAddToCart() {
    addToCart(currentProduct);
  }

  return (
    <main className="p-4 sm:p-6">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-200"
      >
        ← Back to Products
      </button>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-lg bg-white p-5 shadow-sm sm:p-8 lg:flex-row">

        {/* Product Images */}
        <div className="w-full lg:w-1/2">

          {/* Main Image */}
          <div className="flex h-72 items-center justify-center rounded-lg border bg-gray-50 sm:h-96">
            <img
              src={selectedImage}
              alt={currentProduct.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Gallery */}
          <div className="mt-4 flex gap-3 overflow-x-auto">

            {currentProduct.images.map(
              (image, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  className="h-20 w-20 flex-shrink-0 rounded-lg border bg-gray-50 p-1 transition hover:border-black"
                >
                  <img
                    src={image}
                    alt={`${currentProduct.title} ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              )
            )}

          </div>
        </div>

        {/* Product Information */}
        <div className="w-full lg:w-1/2">

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {currentProduct.title}
          </h1>

          {/* Price */}
          <div className="mt-4">

            <div className="flex flex-wrap items-center gap-3">

              <p className="text-2xl font-bold text-gray-900">
                ${currentProduct.price}
              </p>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                {currentProduct.discountPercentage}% OFF
              </span>

            </div>

            <p className="mt-1 text-sm text-gray-500 line-through">
              Original price: $
              {originalPrice.toFixed(2)}
            </p>

          </div>

          {/* Description */}
          <p className="mt-4 leading-7 text-gray-700">
            {currentProduct.description}
          </p>

          {/* Product Details */}
          <div className="mt-6 flex flex-col gap-3">

            <p className="text-gray-700">
              <span className="font-semibold">
                Category:
              </span>{" "}
              {currentProduct.category}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">
                Brand:
              </span>{" "}
              {currentProduct.brand}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">
                Rating:
              </span>{" "}
              ⭐ {currentProduct.rating}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">
                Stock:
              </span>{" "}
              {currentProduct.stock}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">
                Availability:
              </span>{" "}
              {currentProduct.availabilityStatus}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">
                Minimum Order:
              </span>{" "}
              {currentProduct.minimumOrderQuantity}
            </p>

          </div>

          {/* Additional Information */}
          <div className="mt-8 border-t pt-6">

            <p className="mb-4 text-gray-700">
              <span className="font-semibold">
                Shipping:
              </span>{" "}
              {currentProduct.shippingInformation}
            </p>

            <p className="mb-4 text-gray-700">
              <span className="font-semibold">
                Warranty:
              </span>{" "}
              {currentProduct.warrantyInformation}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">
                Return Policy:
              </span>{" "}
              {currentProduct.returnPolicy}
            </p>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={handleFavorite}
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-900 transition hover:bg-gray-100"
            >
              {favorite
                ? "❤️ Remove Favorite"
                : "🤍 Add to Favorite"}
            </button>

          </div>

        </div>
      </div>

    </main>
  );
}