"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6">

      {/* Page Title */}
      <div className="mx-auto mb-6 max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Your shopping
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Shopping Cart
        </h1>

        <p className="mt-2 text-slate-600">
          Review your items before checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (

        /* Empty Cart */
        <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="text-5xl">
            🛒
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Your cart is empty
          </h2>

          <p className="mt-2 text-slate-600">
            You haven't added any products yet.
          </p>

          <Link
            href="/?page=1"
            className="mt-6 inline-flex rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        /* Cart */
        <div className="mx-auto max-w-5xl">

          {/* Cart Items */}
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
              />
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            {/* Continue Shopping */}
            <Link
              href="/?page=1"
              className="w-full rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 text-center font-medium text-white transition hover:bg-indigo-700 lg:w-auto"
            >
              ← Continue Shopping
            </Link>

            {/* Order Summary */}
            <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:max-w-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Order Summary
              </h2>

              {/* Items */}
              <div className="mt-4 flex items-center justify-between border-b border-slate-200 pb-4">

                <span className="text-slate-600">
                  Items
                </span>

                <span className="font-medium text-slate-900">
                  {cartItems.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}
                </span>

              </div>

              {/* Total */}
              <div className="mt-4 flex items-center justify-between">

                <span className="text-lg font-semibold text-slate-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-indigo-600">
                  ${totalPrice.toFixed(2)}
                </span>

              </div>

              {/* Checkout */}
              <button
                className="mt-6 w-full rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}