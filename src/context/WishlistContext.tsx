
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Iproducts } from "@/interfaces/products";

interface WishlistContextType {
  wishlist: Iproducts[];
  hydrated: boolean;
  toggleWishlist: (product: Iproducts) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext =
  createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] = useState<Iproducts[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");

      if (saved) {
        const parsed: Iproducts[] = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlist, hydrated]);

  function getProductId(product: Iproducts) {
    return product.id || product._id;
  }

  function isInWishlist(productId: string) {
    return wishlist.some(
      (product) => getProductId(product) === productId
    );
  }

  function toggleWishlist(product: Iproducts) {
    const productId = getProductId(product);

    if (!productId) return;

    setWishlist((previous) => {
      const exists = previous.some(
        (item) => getProductId(item) === productId
      );

      if (exists) {
        return previous.filter(
          (item) => getProductId(item) !== productId
        );
      }

      return [...previous, product];
    });
  }

  function removeFromWishlist(productId: string) {
    setWishlist((previous) =>
      previous.filter(
        (product) => getProductId(product) !== productId
      )
    );
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        hydrated,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return context;
}
