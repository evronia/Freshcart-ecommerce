
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartNavLink() {
  const { totalPieces } = useCart();

  return (
    <Link href="/cart"
      className="relative inline-flex items-center mt-2  me-1 text-gray-500 hover:text-green-600"
    >
      <ShoppingCart className="size-6" />



      {totalPieces > 0 && (
        <span className="absolute -right-2.5 -top-3 rounded-full bg-green-600 px-1 py-0.5 text-xs font-light text-white">
          {totalPieces}
        </span>
      )}
    </Link>
  );
}
