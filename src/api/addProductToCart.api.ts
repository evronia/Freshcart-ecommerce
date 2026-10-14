
"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addProductToCart(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first to sync your cart.");
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ productId }),
      cache: "no-store",
    }
  );

  const payload = await response.json();

console.log("ADD CART STATUS:", response.status);
console.log("ADD CART RESPONSE:", JSON.stringify(payload, null, 2));
console.log("ADD CART ID:", payload.cartId);
console.log("ADD CART ITEMS:", payload.numOfCartItems);
  if (!response.ok) {
    throw new Error(payload.message || "Failed to add product to cart.");
  }


  console.log(
  "CART AFTER ADDING PRODUCT:",
  JSON.stringify(payload, null, 2)
)
  return payload;
}
