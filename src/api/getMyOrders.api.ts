

"use server";

import { getMyToken } from "@/utilities/getMyToken";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getMyOrders() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const cookieStore = await cookies();

  // NextAuth may use a different cookie name in production.
  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!sessionToken) {
    throw new Error("Session not found. Please login again.");
  }

  const decoded = await decode({
    token: sessionToken,
    secret: process.env.AUTH_SECRET!,
  });

  const userId = decoded?.userId;

  if (typeof userId !== "string" || !userId) {
    throw new Error(
      "User ID not found in the session token. Check your NextAuth JWT callback."
    );
  }

  const apiBase = process.env.API;

  if (!apiBase) {
    throw new Error("API environment variable is missing.");
  }

  const url = `${apiBase}/orders/user/${encodeURIComponent(userId)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  const payload = await response.json();

  console.log("My Orders HTTP status:", response.status);
  console.log("My Orders API response:", payload);
if (!response.ok) {
    throw new Error(
      payload.message || "Failed to fetch your orders."
    );
  }

  const orders = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.data)
      ? payload.data
      : [];

  return {
    success: true,
    data: orders,
  };
}
