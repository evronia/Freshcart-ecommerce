
"use server";

import { getMyToken } from "@/utilities/getMyToken";

const API_URL = "https://ecommerce.routemisr.com";

export async function clearUserCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(`${API_URL}/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to clear cart.");
  }

  return payload;
}
