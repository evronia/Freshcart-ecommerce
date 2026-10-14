


"use server";

import { getMyToken } from "@/utilities/getMyToken";
import { getUserCart } from "@/Actions/getUserCart.action";
import type { ShippingAddress } from "@/interfaces/checkout";

export async function createCashOrder(
  address: ShippingAddress
) {
  console.log("STEP 1: Getting token...");

  const token = await getMyToken();

  console.log("STEP 2: Token received:", Boolean(token));

  if (!token) {
    throw new Error("Please login first.");
  }

  const city = address.city.trim();
  const street = address.street.trim();
  const phone = address.phone.trim();

  if (
    !city ||
    !street ||
    street.length > 500 ||
    !/^01[0125][0-9]{8}$/.test(phone)
  ) {
    throw new Error("Please enter valid shipping details.");
  }

  console.log("STEP 3: Getting user cart...");

  const cartResponse = await getUserCart();
  console.log(
    "Cart API response:",
    JSON.stringify(cartResponse, null, 2)
  );
  console.log("STEP 4: Cart response received");


const cartId =
  cartResponse?.cartId ??
  cartResponse?.data?.cartId ??
  cartResponse?.data?._id ??
  cartResponse?.data?.data?.cartId ??
  cartResponse?.data?.data?._id;

console.log("Cart response keys:", Object.keys(cartResponse ?? {}));
console.log("Resolved cart ID:", cartId);

if (typeof cartId !== "string" || !cartId) {
  console.error(
    "Cart response:",
    JSON.stringify(cartResponse, null, 2)
  );
  throw new Error("Cart ID was not found.");
}
  console.log("STEP 6: Sending create-order request...");

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${encodeURIComponent(cartId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        shippingAddress: {
          city,
          details: street,
          phone,
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    }
  );

  console.log("STEP 7: HTTP status:", response.status);

  const responseText = await response.text();

  console.log("STEP 8: API response:", responseText);

  let payload;

  try {
    payload = JSON.parse(responseText);
  } catch {
    throw new Error("The orders API returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(
      payload.message || "Failed to create cash order."
    );
  }

  return {
    success: true,
    data: payload,
  };
}
