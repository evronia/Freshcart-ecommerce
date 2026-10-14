
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { clearUserCart } from "@/Actions/clearUserCart.action";

export default function AllOrdersPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [error, setError] = useState("");

  const finishCheckout = useCallback(async () => {
    setError("");

    try {
      await clearUserCart();

      clearCart();

      router.replace("/my-orders");
      router.refresh();
    } catch (err) {
      console.error("Clear cart error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not clear your cart. Please try again."
      );
    }
  }, [clearCart, router]);

  useEffect(() => {
    void finishCheckout();
  }, [finishCheckout]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        {error ? (
          <>
            <h1 className="text-xl font-bold text-red-600">
              Could not clear your cart
            </h1>

            <p className="mt-3 text-slate-600">{error}</p>

            <button
              onClick={() => void finishCheckout()}
              className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-green-600">
              Payment successful!
            </h1>

            <p className="mt-3 text-slate-600">
              Clearing your cart and redirecting to your orders...
            </p>
          </>
        )}
      </div>
    </main>
  );
}
