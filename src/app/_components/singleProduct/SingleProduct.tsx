

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";

import { Iproducts } from "@/interfaces/products";
import WishlistButton from "../wishlist/WishlistButton";
import AddToCartButton from "../products/AddToCartButton";

export default function SingleProduct({
  product,
}: {
  product: Iproducts;
}) {
  return (
    <Card className="relative pt-0">
      <div className="absolute right-2 top-2 z-10">
        <WishlistButton product={product} />
      </div>

      <div className="absolute right-2 top-12 z-10 m-1 cursor-pointer rounded-full bg-white p-2 shadow-lg">
        <FaArrowRotateRight className="text-xl text-gray-500 transition-all duration-300 hover:text-green-500" />
      </div>
      <div className="absolute right-2 top-24 z-10 m-1 cursor-pointer rounded-full bg-white p-1 shadow-lg">
        <Link href={`/products/${product.id}`}>
          <IoEyeOutline className="text-2xl text-gray-500 transition-all duration-300 hover:text-green-500" />
        </Link>
      </div>

      <Link href={`/products/${product.id}`}>
        <img
          src={product.imageCover}
          alt={product.title}
          className="aspect-video w-full object-contain"
        />
      </Link>

      <CardHeader>
        <CardTitle className="line-clamp-1">
          {product.title}
        </CardTitle>

        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <div>
          {product.priceAfterDiscount ? (
            <h5>
              <span className="me-3 text-2xl text-green-500">
                {product.priceAfterDiscount}
              </span>

              <span className="text-gray-400 line-through">
                {product.price}
              </span>

              <span> EGP</span>
            </h5>
          ) : (
            <h5>
              <span className="me-3 text-2xl text-black">
                {product.price}
              </span>
              EGP
            </h5>
          )}
        </div>

        <AddToCartButton
          product={{
            id: product._id,
            title: product.title,
            price: product.price,
            imageCover: product.imageCover,
            category:
              typeof product.category === "string"
                ? product.category
                : product.category?.name,
          }}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}
