

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/context/WishlistContext";

import AddToCartButton from "../_components/products/AddToCartButton";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    hydrated,
  } = useWishlist();

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        Loading wishlist...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/70">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <nav className="mb-6 flex gap-3 text-sm">
            <Link href="/" className="text-emerald-700">
              Home
            </Link>
            <span>/</span>
            <span>Wishlist</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center
              justify-center rounded-2xl bg-red-50">
              <Heart className="fill-red-500 text-red-500" size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>
              <p className="text-gray-500">
                {wishlist.length}{" "}
                {wishlist.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        {wishlist.length === 0 ? (
          <div className="rounded-2xl border bg-white px-6 py-16
            text-center shadow-sm">
            <Heart size={44} className="mx-auto text-gray-300" />

            <h2 className="mt-4 text-xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Click the heart on any product to save it here.
            </p>

            <Button className="mt-6 bg-emerald-600">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border
            border-gray-100 bg-white shadow-sm">

            <div className="hidden grid-cols-12 gap-4 bg-gray-50
              px-6 py-5 text-sm text-gray-500 md:grid">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-1 text-center">Add To Cart</div>
              <div className="col-span-1 text-center">Remove</div>
            </div>

            {wishlist.map((product) => {
              const id = product.id || product._id;
              const inStock = product.quantity > 0;
              const discounted =
                product.priceAfterDiscount > 0 &&
                product.priceAfterDiscount < product.price;

              const price = discounted
                ? product.priceAfterDiscount
                : product.price;

              return (
                <div
                  key={id}
                  className="grid grid-cols-1 gap-4 border-b
                    border-gray-100 p-4 last:border-0
                    sm:p-6 md:grid-cols-12 md:items-center"
                >
                  <div className="flex items-center gap-4 md:col-span-6">
                    <Link
                      href={`/products/${id}`}
                      className="flex h-24 w-24 shrink-0 items-center
                        justify-center rounded-xl border bg-gray-50 p-2"
                    >
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    <div className="min-w-0">
                      <Link
                        href={`/products/${id}`}
                        className="line-clamp-2 font-medium
                          hover:text-emerald-700"
                      >
                        {product.title}
                      </Link>

                      <p className="mt-2 text-sm text-gray-400">
                        {product.category?.name ?? "Category"}
                      </p>

                      <p className="mt-2 md:hidden">
                        {price} EGP
                      </p>
                    </div>
                  </div>

                  <div className="hidden text-center md:col-span-2 md:block">
                    <p className="font-semibold">
                      {price} EGP
                    </p>

                    {discounted && (
                      <p className="text-sm text-gray-400 line-through">
                        {product.price} EGP
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between
                    md:col-span-2 md:justify-center">
                    <span className="text-sm text-gray-500 md:hidden">
                      Availability
                    </span>

                    <Badge
                      variant="outline"
                      className={
                        inStock
                          ? "border-green-100 bg-green-50 text-green-700"
                          : "border-red-100 bg-red-50 text-red-600"
                      }
                    >
                      <span className={`mr-1.5 h-1.5 w-1.5
                        rounded-full ${
                          inStock ? "bg-green-500" : "bg-red-500"
                        }`} />
                      {inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-end gap-5
                   md:gap-20 md:col-span-2">
                    {inStock &&
                    
                    // <AddToCart id={id} />
                    <AddToCartButton
                              product={{
                                id: product._id,
                                title: product.title,
                                price: product.price,
                                imageCover: product.imageCover,
                                category:
                                  typeof product.category === "string"
                                    ? product.category
                                    : product.category?.name,
                              }}
                              className="md:w-[20%] md:px-13 md:ms-0 ms-10 "
                            />
                    }

                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Remove ${product.title} from wishlist`}
                      onClick={() => removeFromWishlist(id)}
                      className="shrink-0 md:ms-0 ms-1 text-gray-400
                        hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
        )}
        
              <button className="flex items-center gap-2 mt-5 text-sm font-medium text-green-600 hover:text-green-700">
                <ArrowLeft className="h-4 w-4" />
                <Link href="/products">Continue Shopping
                </Link>
              </button>
      </section>
    </main>
  );
}
