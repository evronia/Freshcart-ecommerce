


import { cookies } from "next/headers";
import CheckoutClient from "@/app/checkout/CheckoutClient";
import type { ShippingAddress } from "@/interfaces/checkout";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const savedAddress = cookieStore.get(
    "freshcart-shipping-address"
  )?.value;

  let initialAddress: ShippingAddress = {
    city: "",
    street: "",
    phone: "",
  };

  if (savedAddress) {
    try {
      const parsed: unknown = JSON.parse(savedAddress);

      if (
        parsed !== null &&
        typeof parsed === "object" &&
        "city" in parsed &&
        "street" in parsed &&
        "phone" in parsed &&
        typeof parsed.city === "string" &&
        typeof parsed.street === "string" &&
        typeof parsed.phone === "string"
      ) {
        initialAddress = {
          city: parsed.city,
          street: parsed.street,
          phone: parsed.phone,
        };
      }
    } catch {
    }
  }

  return <CheckoutClient initialAddress={initialAddress} />;
}
