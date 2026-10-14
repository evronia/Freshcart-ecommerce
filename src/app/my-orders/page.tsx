
import Link from "next/link";
import { getMyOrders } from "@/api/getMyOrders.api";

type OrderItem = {
  _id?: string;
  count?: number;
  price?: number;
  product?: {
    title?: string;
    imageCover?: string;
  };
};

type Order = {
  _id?: string;
  id?: string;
  createdAt?: string;
  isDelivered?: boolean;
  isPaid?: boolean;
  paymentMethodType?: string;
  totalOrderPrice?: number;
  cartItems?: OrderItem[];
};

export default async function MyOrdersPage() {
  let orders: Order[] = [];
  let errorMessage = "";

  try {
    const result = await getMyOrders();
    orders = result.data as Order[];
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Could not load your orders.";
  }

  const formatEGP = (amount: number) =>
    `${amount.toLocaleString("en-EG")} EGP`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">
          My Orders
        </h1>

        <p className="mt-2 text-slate-500">
          Track and review your purchases.
        </p>

        {errorMessage ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {errorMessage}
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-2 text-slate-500">
              Your orders will appear here after checkout.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order, index) => (
              <article
                key={order._id ?? order.id ?? index}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                  <div>
                    <h2 className="font-bold">
                      Order #{order._id ?? order.id ?? index + 1}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-EG"
                          )
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {order.cartItems?.map((item, itemIndex) => (
                    <div
                      key={item._id ?? itemIndex}
                      className="flex items-center gap-4"
                    >
                      {item.product?.imageCover && (
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title ?? "Product"}
                          className="size-16 rounded-lg bg-slate-50 object-contain"
                        />
                      )}

                      <div className="flex-1">
                        <p className="font-medium">
                          {item.product?.title ?? "Product"}
                        </p>

                        <p className="text-sm text-slate-500">
                          Quantity: {item.count ?? 1}
                        </p>
                      </div>

                      {typeof item.price === "number" && (
                        <span className="font-semibold">
                          {formatEGP(item.price)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap justify-between gap-3 border-t pt-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      Payment
                    </p>
                    <p className="font-medium">
                      {order.paymentMethodType ?? "Cash on Delivery"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      Total
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {typeof order.totalOrderPrice === "number"
                        ? formatEGP(order.totalOrderPrice)
                        : "Unavailable"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
