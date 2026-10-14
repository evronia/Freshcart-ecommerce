
"use client";

import Link from "next/link";
import { ShoppingCart, Plus, Minus, Trash2, Percent, Lock, ArrowLeftIcon } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formatEGP = (amount: number) =>
  `${amount.toLocaleString("en-EG", {
    maximumFractionDigits: 2,
  })} EGP`;

export default function CartPage() {
  const {
    items,
    totalPieces,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  function handleClearCart() {
    if (items.length === 0) return;

    clearCart();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-green-600 text-white">
              <ShoppingCart className="size-8" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Shopping Cart
            </h1>
          </div>

          <p className="mt-3 text-lg text-slate-500">
            You have{" "}
            <span className="font-semibold text-green-600">
              {totalPieces} {totalPieces === 1 ? "item" : "items"}
            </span>{" "}
            in your cart
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="flex flex-col items-center justify-center rounded-2xl border-gray-200 px-6 py-16 text-center shadow-sm">
            <ShoppingCart className="mb-4 size-16 text-gray-300" />

            <h2 className="text-2xl font-bold text-slate-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-slate-500">
              Discover our products and add something you love.
            </p>

            <Button

              className="mt-6 bg-green-600 hover:bg-green-700"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {/* Cart products */}
            <section className="space-y-5 lg:col-span-2">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="rounded-2xl border-gray-200 bg-white p-4 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* Product image */}
                    <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-3 sm:w-36">
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Product details */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {item.title}
                      </h2>

                      {item.category && (
                        <Badge
                          variant="secondary"
                          className="mt-3 rounded-full bg-green-50 px-3 font-normal text-green-700 hover:bg-green-50"
                        >
                          {item.category}
                        </Badge>
                      )}

                      <p className="mt-4 text-xl font-bold text-green-600">
                        {formatEGP(item.priceAfterDiscount ||  item.price)}
                      </p>

                      {/* Quantity controls */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center rounded-xl border border-gray-200 p-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Decrease ${item.title} quantity`}
                            disabled={item.quantity <= 1}
                            onClick={() => decreaseQuantity(item.id)}
                            className="size-10 rounded-lg text-slate-600 disabled:opacity-40"
                          >
                            <Minus className="size-4" />
                          </Button>

                          <span
                            aria-live="polite"
                            className="min-w-10 text-center font-semibold text-slate-900"
                          >
                            {item.quantity}
                          </span>

                          <Button
                            type="button"
                            size="icon"
                            aria-label={`Increase ${item.title} quantity`}
                            onClick={() => increaseQuantity(item.id)}
                            className="size-10 rounded-lg bg-green-600 text-white hover:bg-green-700"
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label={`Remove ${item.title} from cart`}
                          onClick={() => removeFromCart(item.id)}
                          className="size-10 rounded-xl border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Item total */}
                    <div className="flex items-end justify-between border-t border-gray-100 pt-4 sm:min-w-28 sm:flex-col sm:items-end sm:justify-center sm:border-0 sm:pt-0">
                      <span className="text-sm text-slate-400">
                        Item Total
                      </span>

                      <span className="text-xl font-bold text-slate-900">
                        {formatEGP(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Cart actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
                <Button

                  variant="link"
                  className="px-0 text-base text-green-600 hover:text-green-700"
                >
                  <Link href="/products">
                    <ArrowLeftIcon className="mr-2 size-5 inline-block" /> 
                    Continue Shopping
                  </Link>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClearCart}
                  className="text-slate-500 hover:text-red-600"
                >
                  <Trash2 className="mr-2 size-4" />
                  Clear all items
                </Button>
              </div>
            </section>

            {/* Order summary */}
            <aside className="lg:col-span-1">
              <Card className="overflow-hidden rounded-2xl border-gray-200 py-0 shadow-sm">
                <div className="bg-slate-900 px-6 py-6">
                  <h2 className="text-xl font-bold text-white">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-5 p-6">
                  <div className="flex items-center justify-between gap-3 text-slate-600">
                    <span>Subtotal ({totalPieces} items)</span>
                    <span className="font-semibold">
                      {formatEGP(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3 text-slate-600">
                    <span>Shipping</span>
                    <span className="text-right font-medium text-green-600">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-5">
                    <div className="flex items-center justify-between gap-3 text-lg font-bold">
                      <span className="text-slate-700">
                        Estimated Total
                      </span>
                      <span className="text-green-600">
                        {formatEGP(subtotal)}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() =>
                      alert("Connect your login page to enable checkout.")
                    }
                    className="h-14 w-full rounded-xl  border-dashed border-gray-500 bg-transparent text-base font-semibold text-gray-400 hover:bg-green-200/50 transition-all duration-300 hover:text-green-600 cursor-pointer"
                  >
                    <Percent className="mr-2 size-5" />
                    Applay Promo code
                  </Button>
                  
                  <Link
                    href="/checkout"
                    className="flex h-14 w-full items-center justify-center rounded-xl bg-green-600 text-base font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <Lock className="mr-2 size-5" />
                    Secure Checkout
                  </Link>
                  
                  <Button

                    variant="link"
                    className="px-0 mx-auto block text-base text-green-600 hover:text-green-700"
                  >
                    <Link href="/products">
                      <ArrowLeftIcon className="mr-2 size-5 inline-block" /> 
                        Continue Shopping
                    </Link>
                  </Button>
                </div>
              </Card>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
