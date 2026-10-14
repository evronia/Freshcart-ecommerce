
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, ReceiptText } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  saveShippingAddress,
} from "../../Actions/checkout.action";

import type {
  ShippingAddress,
  PaymentMethodType,
} from "@/interfaces/checkout";
import { createCashOrder } from "@/Actions/createCashOrder.action";
import {
  createOnlineCheckoutSession,
} from "@/api/createOnlineCheckoutSession.api";

export default function CheckoutClient({
  initialAddress,
}: {
  initialAddress: ShippingAddress;
}) {
  const router = useRouter();
  const { items, totalPieces, subtotal, clearCart } = useCart();

  const [address, setAddress] =
    useState<ShippingAddress>(initialAddress);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("cash");

  const [saveAddress, setSaveAddress] = useState(true);
  const [loading, setLoading] = useState(false);

  const formatEGP = (amount: number) =>
    `${amount.toLocaleString("en-EG")} EGP`;

  function updateAddress(
    field: keyof ShippingAddress,
    value: string
  ) {
    setAddress((current) => ({
      ...current,
      [field]: value,
    }));
  }




  async function handlePlaceOrder(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      router.push("/cart");
      return;
    }

    if (
      !address.city.trim() ||
      !address.street.trim() ||
      !address.phone.trim()
    ) {
      toast.error("Please complete your shipping address.");
      return;
    }

    setLoading(true);

    try {
      // Online payment
      if (paymentMethod === "online") {
        const { checkoutUrl } =
          await createOnlineCheckoutSession();


        if (saveAddress) {
          try {
            const saved = await saveShippingAddress(address);

            if (!saved.success) {
              toast.error(
                "Payment is ready, but the address could not be saved."
              );
            }
          } catch {
            toast.error(
              "Payment is ready, but the address could not be saved."
            );
          }
        }

        // Do not clear the cart before payment succeeds.
        window.location.assign(checkoutUrl);
        return;
      }

      // Cash on Delivery
      const result = await createCashOrder(address);

      if (!result.success) {
        throw new Error("Failed to create your order.");
      }

      if (saveAddress) {
        try {
          const saved = await saveShippingAddress(address);

          if (!saved.success) {
            toast.error(
              "Order created, but address could not be saved."
            );
          }
        } catch {
          toast.error(
            "Order created, but address could not be saved."
          );
        }
      }

      clearCart();

      toast.success("Order created successfully!");

      router.push("/my-orders");
      router.refresh();
    } catch (error) {
      console.error("Checkout error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to process your order."
      );
    } finally {
      setLoading(false);
    }
  }

  // async function handleOnlinePayment() {
  //   setLoading(true);

  //   try {
  //     // Replace these with your actual cart ID and auth token.
  //     const cartId = "YOUR_CURRENT_CART_ID";
  //     const token = "YOUR_AUTH_TOKEN";

  //     const baseUrl = window.location.origin;

  //     const response = await fetch(
  //       `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(baseUrl)}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           token,
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const result = await response.json();

  //     console.log("Checkout session:", result);

  //     if (!response.ok) {
  //       throw new Error(
  //         result.message ?? "Could not create checkout session."
  //       );
  //     }

  //     // Inspect the response in DevTools to confirm the URL path.
  //     const checkoutUrl =
  //       result.session?.url ??
  //       result.session?.session?.url ??
  //       result.url;

  //     if (!checkoutUrl) {
  //       throw new Error(
  //         "Checkout URL was not found in the API response."
  //       );
  //     }

  //     window.location.assign(checkoutUrl);
  //   } catch (error) {
  //     toast.error(
  //       error instanceof Error
  //         ? error.message
  //         : "Payment failed to start."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // }


  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-slate-500">
          Add products before proceeding to checkout.
        </p>

        <Button className="mt-6 bg-green-600">
          <Link href="/products">Browse Products</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center gap-3 text-sm">
          <Link href="/" className="text-slate-500">Home</Link>
          <span>/</span>
          <Link href="/cart" className="text-slate-500">Cart</Link>
          <span>/ Checkout</span>
        </nav>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
              <span className="rounded-xl bg-green-600 p-3 text-white">
                <ReceiptText className="size-8" />
              </span>
              Complete Your Order
            </h1>

            <p className="mt-3 text-slate-500">
              Review your items and complete your purchase
            </p>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-2 text-green-600"
          >
            <ArrowLeft className="size-5" />
            Back to Cart
          </Link>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]"
        >
          <div className="space-y-6">
            <Card className="overflow-hidden rounded-2xl p-0">
              <div className="bg-linear-to-r from-green-600 to-green-700 p-6 text-white">
                <h2 className="text-xl font-bold">
                  <MapPin className="mr-2 inline size-5" />
                  Shipping Address
                </h2>
                <p className="mt-2">
                  Where should we deliver your order?
                </p>
              </div>

              <div className="space-y-5 p-6">
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-blue-800">
                  <p className="font-semibold">
                    Delivery Information
                  </p>
                  <p className="mt-1 text-sm">
                    Please ensure your address is accurate.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="city"
                    required
                    maxLength={100}
                    autoComplete="address-level2"
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    value={address.city}
                    onChange={(event) =>
                      updateAddress("city", event.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="street" className="text-sm font-medium">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="street"
                    required
                    maxLength={500}
                    autoComplete="street-address"
                    rows={3}
                    placeholder="Street name, building number, floor, apartment..."
                    value={address.street}
                    onChange={(event) =>
                      updateAddress("street", event.target.value)
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={11}
                    pattern="01[0125][0-9]{8}"
                    title="Enter a valid 11-digit Egyptian mobile number."
                    placeholder="01xxxxxxxxx"
                    value={address.phone}
                    onChange={(event) =>
                      updateAddress(
                        "phone",
                        event.target.value.replace(/\D/g, "").slice(0, 11)
                      )
                    }
                  />
                  <p className="text-xs text-slate-500">
                    Egyptian mobile numbers only
                  </p>
                </div>

                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(event) =>
                      setSaveAddress(event.target.checked)
                    }
                    className="size-4 accent-green-600"
                  />
                  Save this address for next time
                </label>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-2xl p-0">
              <div className="bg-linear-to-r from-green-600 to-green-700 p-6 text-white">
                <h2 className="text-xl font-bold">Payment Method</h2>
                <p className="mt-2">Choose how you&apos;d like to pay</p>
              </div>

              <div className="space-y-4 p-6">
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 ${paymentMethod === "cash"
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="accent-green-600"
                  />
                  <span className="flex-1">
                    <span className="block font-bold text-green-700">
                      Cash on Delivery
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">
                      Pay when your order arrives.
                    </span>
                  </span>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 ${paymentMethod === "online"
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="accent-green-600"
                  />
                  <span className="flex-1">
                    <span className="block font-bold">Pay Online</span>
                    <span className="mt-1 block text-sm text-slate-500">
                      Secure card payment.
                    </span>
                  </span>
                </label>
                {paymentMethod === "online" && (
                  <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                    You will be redirected to Stripe to complete your secure payment.
                  </p>
                )}
              </div>
            </Card>
          </div>

          <Card className="overflow-hidden rounded-2xl p-0 lg:sticky lg:top-6">
            <div className="bg-linear-to-r from-green-600 to-green-700 p-6 text-white">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <p className="mt-2">{totalPieces} items</p>
            </div>

            <div className="space-y-4 p-5">
              <div className="max-h-80 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                  >
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="size-16 rounded-lg bg-white object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.quantity} × {formatEGP(item.price)}
                      </p>
                    </div>
                    <span className="text-sm font-bold">
                      {formatEGP(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t pt-4 text-slate-600">
                <span>Subtotal</span>
                <span>{formatEGP(subtotal)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">
                  FREE
                </span>
              </div>

              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  {formatEGP(subtotal)}
                </span>
              </div>

              <Button
                type="submit"
                disabled={loading || items.length === 0}
                className="h-14 w-full bg-green-600 text-base font-bold hover:bg-green-700"
              >
                {loading
                  ? paymentMethod === "online"
                    ? "Redirecting to payment..."
                    : "Creating Order..."
                  : paymentMethod === "online"
                    ? "Pay with Visa"
                    : "Place Order"}
                {/* {loading ? "Creating Order..." : "Place Order"} */}
              </Button>

              <p className="text-center text-xs text-slate-500">
                Your address is handled securely.
              </p>
            </div>
          </Card>
        </form>
      </div>
    </main>
  );
}
