
"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useWishlist } from "@/context/WishlistContext";
import type { Iproducts } from "../../../interfaces/products";

export default function WishlistButton({
  product, className}: {
  product: Iproducts; className?:string 
}) {
  const { toggleWishlist, isInWishlist, hydrated } =
    useWishlist();

  const productId = product.id || product._id;
  const isSaved = isInWishlist(productId);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      disabled={!hydrated}
      aria-label={
        isSaved ? "Remove from wishlist" : "Add to wishlist"
      }
      aria-pressed={isSaved}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(product);
      }}
      className="rounded-full border-gray-200 bg-white shadow-sm
        transition-all duration-200 hover:bg-red-50"
    >
      <Heart
        size={21}
        className={
          isSaved
            ? "fill-red-500 text-red-500"
            : "fill-transparent text-gray-400"
        }
      />
    </Button>
  );
}
