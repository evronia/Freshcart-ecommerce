export async function getCart() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
console.log(data);

  if (!res.ok) {
    throw new Error(data.message || "Failed to get cart");
  }

  return data;
}