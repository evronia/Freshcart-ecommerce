import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import MyButton from "../myButton/MyButton";
import Link from "next/link";

export async function MySlider() {



  return (
    <Carousel className="w-full   p-2 ">
      <CarouselContent className="w-full ">

        <CarouselItem className="basis-full  ">
          <Card className="w-full h-full">
            <CardContent className="w-full ">
              <div className="relative w-full h-62.5 md:h-87.5 lg:h-100 overflow-hidden rounded-2xl">
                <Image
                  src={"/assets/images/slider-image.png"}

                   loading="eager"
                  alt="Fresh products slider"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />

                <div
                  className="rounded-2xl
                    absolute inset-0
                    bg-[linear-gradient(90deg,rgba(0,201,80,0.9)_0%,rgba(5,223,114,0.5)_100%)]
                  ">
                </div>

                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-lg text-white">

                      <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
                        Fresh Products Delivered
                        to your Door
                      </h2>

                      <p className="mb-2 text-base font-medium md:text-lg ">
                        Get 20% off your first order
                      </p>

                      <div className="flex gap-3">
                        <MyButton className="bg-white text-green-500 px-6 py-4  hover:bg-gray-100  hover:scale-110 transition-all duration-300 hover:text-green-600 rounded-[8px] ">Shop Now</MyButton>
                        <MyButton className="bg-transparent border-2 border-white px-6 py-3  hover:scale-110 hover:bg-transparent rounded-[8px] transition-all duration-300 ">View Deals</MyButton>
                      </div>


                    </div>
                  </div>
                </div>
              </div>


            </CardContent>
          </Card>
        </CarouselItem>


        <CarouselItem className="basis-full  ">
          <Card className="w-full h-full">
            <CardContent className="w-full ">
              <div className="relative w-full h-62.5 md:h-87.5 lg:h-100 overflow-hidden rounded-2xl ">
                <Image
                  src={"/assets/images/slider-image.png"}
                  alt="Fresh products slider"
                  fill
                  sizes="100vw"
                  className="object-cover"
                    loading="lazy"
                />

                <div
                  className="rounded-2xl
                    absolute inset-0
                    bg-[linear-gradient(90deg,rgba(0,201,80,0.9)_0%,rgba(5,223,114,0.5)_100%)]
                  ">
                </div>

                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-lg text-white">

                      <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
                        Premium Quality Guaranteed
                      </h2>

                      <p className="mb-2 text-base font-medium md:text-lg ">
                        Fresh from farm to your table                      </p>

                      <div className="flex gap-3">
                        <MyButton className="bg-white text-blue-500 font-semibold px-6 py-4  hover:bg-white rounded-[8px] ">Shop Now </MyButton>
                        <MyButton className="bg-transparent border-2 font-semibold border-white px-6 py-3  hover:bg-transparent rounded-[8px] ">Delivery Info</MyButton>
                      </div>


                    </div>
                  </div>
                </div>
              </div>


            </CardContent>
          </Card>
        </CarouselItem>

        <CarouselItem className="basis-full  ">
          <Card className="w-full h-full">
            <CardContent className="w-full ">
              <div className="relative w-full h-62.5 md:h-87.5 lg:h-100 overflow-hidden rounded-2xl">
                <Image
                  src={"/assets/images/slider-image.png"}
                   alt="Fresh products slider"
                  fill
                  sizes="100vw"
                  className="object-cover"
                    loading="lazy"
                   />

                <div
                  className="rounded-2xl
                    absolute inset-0
                    bg-[linear-gradient(90deg,rgba(0,201,80,0.9)_0%,rgba(5,223,114,0.5)_100%)]
                  ">
                </div>

                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-lg text-white">

                      <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
                        Fast & Free Delivery
                      </h2>

                      <p className="mb-2 text-base font-medium md:text-lg ">
                        Same day delivery available                      </p>

                      <div className="flex gap-3">
                        <Link href="/products">
                          <MyButton className="bg-white text-purple-500 px-6 py-4  hover:bg-gray-100  hover:scale-110 transition-all duration-300 hover:text-green-600 rounded-[8px] ">Order Now</MyButton>

                        </Link>                        <MyButton className="bg-transparent border-2 border-white px-6 py-3  hover:scale-110 hover:bg-transparent rounded-[8px] transition-all duration-300 ">Delivery Info</MyButton>
                      </div>


                    </div>
                  </div>
                </div>
              </div>


            </CardContent>
          </Card>
        </CarouselItem>



      </CarouselContent>

      <CarouselPrevious className={"left-3.5"} />
      <CarouselNext className={" right-3.5"} />
    </Carousel>
  )
}