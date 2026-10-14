
"use server";

import { cookies } from "next/headers";
import type { ShippingAddress } from "@/interfaces/checkout";

export async function saveShippingAddress(
  address: ShippingAddress
) {
  const city = address.city.trim();
  const street = address.street.trim();
  const phone = address.phone.trim();

  if (!city || !street || !/^01[0125][0-9]{8}$/.test(phone)) {
    return {
      success: false,
      message: "Please enter valid shipping details.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "freshcart-shipping-address",
    JSON.stringify({ city, street, phone }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    }
  );

  return {
    success: true,
    message: "Shipping address saved successfully.",
  };
}
