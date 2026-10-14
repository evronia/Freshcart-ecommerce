import Image from "next/image"
import Link from "next/link"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { ArrowRight } from "lucide-react"

interface BrandCardProps {
  id: string
  name: string
  image: string
  isActive?: boolean
}

export default function BrandCard({
  id,
  name,
  image,
}: BrandCardProps) {
  return (
    <Link href={`/products?brand=${id}`}>
      <Card
        className={`
          group h-full xcursor-pointer rounded-2xl
          border transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg
          hover:text-purple-600
        `}
      >
        <CardContent className="flex flex-col items-center p-6">
          
          <div className="flex h-4 w-full items-center justify-center rounded-xl bg-gray-50 p-5">
            <div className="flex h-full w-full items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white">
              <Image
                src={image}
                alt={name}
                width={150}
                height={100}
                className="max-h-20 w-auto object-contain  transition-transform duration-300 "
              />
            </div>
          </div>

          <h3
            className={`
              mt-5 text-base font-medium
            `}
          >
            {name}
          </h3>

          
            <span className="opacity-0 group-hover:flex group-hover:opacity-100 group-hover:-translate-y-1 mt-2 items-center gap-1 text-sm text-purple-600 transition-all duration-1000 ">
              View Products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          

        </CardContent>
      </Card>
    </Link>
  )
}