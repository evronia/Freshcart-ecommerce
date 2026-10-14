
"use server";

import { getMyToken } from "@/utilities/getMyToken";

const API_URL = "https://ecommerce.routemisr.com";

export async function createOnlineCheckoutSession(
  baseUrl: string
): Promise<{ checkoutUrl: string }> {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  let origin: string;

  try {
    const parsedUrl = new URL(baseUrl);

    if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {
      throw new Error();
    }

    origin = parsedUrl.origin;
  } catch {
    throw new Error("Invalid checkout return URL.");
  }

  const cartResponse = await fetch(`${API_URL}/api/v2/cart`, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const cartPayload = await cartResponse.json();

  if (!cartResponse.ok) {
    throw new Error(
      cartPayload.message || "Could not retrieve your cart."
    );
  }

  const cartId =
    cartPayload.cartId ?? cartPayload.data?._id;

  if (typeof cartId !== "string" || !cartId) {
    throw new Error("Cart ID was not found on the server.");
  }


const checkoutResponse = await fetch(
  `${API_URL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(origin)}`,
  {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }
);

const checkoutPayload = await checkoutResponse.json();

console.log("Checkout HTTP status:", checkoutResponse.status);
console.log("Checkout response:", checkoutPayload);

if (!checkoutResponse.ok) {
  throw new Error(
    checkoutPayload.message ??
      "Could not create the checkout session."
  );
}

const checkoutUrl =
  checkoutPayload.session?.url ??
  checkoutPayload.session?.session?.url ??
  checkoutPayload.url;

if (typeof checkoutUrl !== "string") {
  throw new Error(
    "Checkout URL was not found in the API response."
  );
}

  let parsedCheckoutUrl: URL;

  try {
    parsedCheckoutUrl = new URL(checkoutUrl);
  } catch {
    throw new Error("The checkout URL is invalid.");
  }

  if (
    parsedCheckoutUrl.protocol !== "https:" ||
    parsedCheckoutUrl.hostname !== "checkout.stripe.com"
  ) {
    throw new Error("The checkout URL is not trusted.");
  }

  return { checkoutUrl };
}
