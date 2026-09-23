"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

type CartItemProps = {
  product: Product & {
    quantity: number;
  };
};

export default function CartItem({
  product,
}: CartItemProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice =
    product.price * product.quantity;

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:items-center">

      {/* Product Image */}
      <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-50 sm:h-28 sm:w-28">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Information */}
      <div className="flex-1">

        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-900">
          {product.title}
        </h2>

        {/* Product Price */}
        <p className="mt-1 text-gray-600">
          ${product.price} each
        </p>

        {/* Quantity Controls */}
        <div className="mt-3 flex items-center gap-3">

          <button
            onClick={() =>
              decreaseQuantity(product.id)
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg font-bold text-gray-900 transition hover:bg-gray-100"
          >
            -
          </button>

          <span className="min-w-8 text-center font-semibold text-gray-900">
            {product.quantity}
          </span>

          <button
            onClick={() =>
              increaseQuantity(product.id)
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg font-bold text-gray-900 transition hover:bg-gray-100"
          >
            +
          </button>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

        {/* Total Product Price */}
        <p className="text-lg font-bold text-gray-900">
          ${totalPrice.toFixed(2)}
        </p>

        {/* Delete Button */}
        <button
          onClick={() =>
            removeFromCart(product.id)
          }
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Delete
        </button>

      </div>

    </div>
  );
}