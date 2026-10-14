
"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function getUserCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      method: "GET",
      headers: { token },
      cache: "no-store",
    }
  );

  const responseText = await response.text();

  console.log("GET CART HTTP STATUS:", response.status);
  console.log("GET CART RAW RESPONSE:", responseText);

  let payload: any;

  try {
    payload = JSON.parse(responseText);
  } catch {
    throw new Error("Cart API returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(payload.message || "Failed to get cart.");
  }

  console.log("GET CART RESPONSE KEYS:", Object.keys(payload));
  console.log("GET CART ID:", payload.cartId ?? payload.data?._id);

  return payload;
}
