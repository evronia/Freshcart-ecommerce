
"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { CartProduct } from "@/interfaces/cart.interface";

interface AddToCartButtonProps {
  product: CartProduct;
  className?: string;
}

export default function AddToCartButton({
  product,
  className,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);

    window.setTimeout(() => setAdded(false), 1200);


    
  }

  return (
    <Button
      type="button"
      onClick={handleAddToCart}
      className={`bg-green-600 text-white hover:bg-green-700 ${className ?? ""}`}
    >
      {added ? (
        <>
          <Check className="md:mr-2 mr-0 size-4" />
          <span className="md:block hidden">Added to Cart</span>
        </>
      ) : (
        <>
          <ShoppingCart className="md:mr-2 mr-0 size-4" />
          <span className="md:block hidden" >Add to Cart</span>
        </>
      )}
    </Button>
  );
}
