"use client"

import MyButton from "@/app/_components/myButton/MyButton";
import { Spinner } from "@/components/ui/spinner";
import { Iproducts } from "@/interfaces/products";
import { Button } from "@base-ui/react";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
import AddToCartButton from "@/app/_components/products/AddToCartButton";
import WishlistButton from "@/app/_components/wishlist/WishlistButton";
import { getProducts } from "@/api/products.api";
import SingleProduct from "@/app/_components/singleProduct/SingleProduct";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


export default function ProductDetails() {
    const { id } = useParams()


    const [productDetails, setProductDetails] = useState<Iproducts | null>(null)
    const [count, setCount] = useState<number>(1)
    const [relatedProducts, setRelatedProducts] = useState<Iproducts[] | []>([])
  
  
    async function getProductDetails() {
        await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(async (res) => {
            const data = await res.json()
            setProductDetails(data.data);
            console.log(data.data);

            // call get related products function
            getRelatedProducts(data.data.category._id)

        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getProductDetails()
    }, [])


    // get Related Products
    async function getRelatedProducts(categoryId:string){
        const relatedProducts = await getProducts(`?category[in]=${categoryId}`)
       console.log(relatedProducts);   
       setRelatedProducts(relatedProducts)
    }

    if (!productDetails) {
        return <div className="flex items-center justify-center h-screen">
            <Spinner className="text-green-500 text-5xl" />
        </div>
    }





return <>
  <div className="container mx-auto my-5 px-3 sm:px-5 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

      {/* Product Images */}
      <div className="lg:col-span-4 min-w-0">
        <div className="rounded-2xl shadow-md border border-gray-100 p-3 sm:p-4">
          <img
            className="w-full aspect-square object-contain rounded-xl"
            src={productDetails.imageCover}
            alt={productDetails.title}
          />

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-4">
            {productDetails.images.map(
              (image: string, index: number) => (
                <img
                  key={index}
                  className="w-full aspect-square object-contain rounded-lg border border-gray-200 p-1 cursor-pointer hover:border-green-500 transition"
                  src={image}
                  alt={`${productDetails.title} ${index + 1}`}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="lg:col-span-8 min-w-0 rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 lg:p-8">

        {/* Category & Brand */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="bg-green-50 text-sm text-green-600 px-3 py-1 rounded-full">
            {productDetails.category.name}
          </span>

          <span className="bg-gray-100 text-sm text-gray-600 px-3 py-1 rounded-full">
            {productDetails.brand.name}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 wrap-break-word">
          {productDetails.title}
        </h1>

        {/* Ratings */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm sm:text-base">
          <span className="text-gray-600">
            {productDetails.ratingsAverage}
          </span>

          <span className="text-gray-500">
            ({productDetails.ratingsQuantity} reviews)
          </span>
        </div>

        {/* Price */}
        <p className="text-2xl sm:text-3xl font-bold mb-4">
          {productDetails.price} EGP
        </p>

        {/* Description */}
        <p className="text-gray-500 leading-7 text-sm sm:text-base mb-6">
          {productDetails.description}
        </p>

        {/* Quantity */}
        <h2 className="text-gray-700 text-lg font-medium mb-3">
          Quantity
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => setCount((prev) => Math.max(1, prev - 1))}
            disabled={count <= 1}
            aria-label="Decrease quantity"
          >
            <FaCircleMinus className="text-green-500 text-2xl" />
          </Button>

          <input
            className="w-20 sm:w-24 border border-gray-200 rounded-lg py-2 text-center outline-none"
            type="number"
            min={1}
            max={productDetails.quantity}
            value={count}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (value >= 1 && value <= productDetails.quantity) {
                setCount(value);
              }
            }}
          />

          <Button
            onClick={() =>
              setCount((prev) =>
                Math.min(productDetails.quantity, prev + 1)
              )
            }
            disabled={count >= productDetails.quantity}
            aria-label="Increase quantity"
          >
            <IoAddCircleSharp className="text-green-500 text-3xl" />
          </Button>
        </div>

        {/* Total Price */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5 mb-6">
          <h3 className="font-medium text-base sm:text-lg text-gray-500">
            Total Price
          </h3>

          <p className="text-xl sm:text-2xl font-semibold text-green-500">
            {(productDetails.price * count).toLocaleString()} EGP
          </p>
        </div>

        {/* Purchase Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <AddToCartButton
            product={{
              id: productDetails._id,
              title: productDetails.title,
              price: productDetails.price,
              imageCover: productDetails.imageCover,
            }}
            className="w-full"
          />

          <MyButton className="bg-black text-white text-base sm:text-lg w-full hover:bg-gray-800">
            <MdElectricBolt />
            <span>Buy Now</span>
          </MyButton>
        </div>

        {/* Wishlist & Share */}
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <WishlistButton
            product={productDetails}
            className="w-full"
          />

          <MyButton className="bg-white text-gray-500 border border-gray-300 hover:bg-gray-50 hover:border-green-500 hover:text-green-500 px-4">
            <FaShareNodes />
          </MyButton>
        </div>
      </div>
    </div>
  </div>



    <div className=" grid gap-5 py-15 md:grid-cols-4 lg:grid-cols-5 container mx-auto my-5 px-3 sm:px-5 lg:px-8 ">
  
            <div className="flex justify-between items-center  mt-10 col-span-5">
          <div className='relative'>
            <h2 className="text-3xl font-bold rounded-2xl  ml-6 before:content-[''] before:absolute before:left-3 before:top-0 before:w-2 before:h-9 before:bg-green-700 px-2 before:rounded-t-3xl before:rounded-b-3xl ">Related<span className="text-green-700 ml-2">Products</span></h2>
          </div>
          <Link href="/products" className='flex items-center gap-2 ml-4 text-green-600  cursor-pointer hover:text-green-700 '>
            <div className="">
              <h2 className="text-xl font-medium   ">View All Products </h2>
            </div>
            <div className="   rounded-full"><FaArrowRight className="text-lg " /></div>
          </Link>
  
  
  
        </div>

              <div className=" grid gap-5  md:grid-cols-4 lg:grid-cols-5 mt-5 col-span-5">
          
              
              {
                  relatedProducts.map((product: Iproducts) => {
                      return <SingleProduct key={product._id} product={product} />
                  })
              }
          </div>
          
        </div>
</>


















//     return (

//         <div className="container shadow-sm rounded-2xl p-5 mx-auto my-5 ">
//             <div className="grid grid-cols-12 gap-2">
//                 <div className="sm:col-span-3 col-span-12 md:col-span-3  image-side shadow-2xl rounded-2xl sticky top-3 h-fit ">
//                     <img className="w-full rounded-t-2xl" src={productDetails.imageCover} alt="" />
//                     <div className="small-image  w-full flex items-center justify-evenly my-3 ">
//                         {productDetails.images.map((image: string, index: number) => (
//                             <img key={index} className="small-image  me-1 w-[20%]" src={image} alt="" />
//                         ))}
//                     </div>
//                 </div>

//                 <div className="sm:col-span-9 col-span-12 md:col-span-9 ms-5  ps-5 shadow-2xl sticky top-3 h-fit ">
//                     <div className="badge  mb-5 flex gap-3  ">
//                         <span className="bg-green-50 text-sm  text-green-600 px-2 py-1 rounded-2xl hover:bg-green-200  cursor-pointer transition-all duration-400 ">{productDetails.category.name}</span>
//                         <span className="bg-gray-200 px-2 py-1 rounded-2xl cursor-pointer">{productDetails.brand.name}</span>
//                     </div>
//                     <h1 className="text-3xl mb-5 font-bold">{productDetails.title}</h1>
//                     <div className="ratings mb-5">
//                         <span className=" text-gray-600 me-2">{productDetails.ratingsAverage}</span>
//                         <span className=" text-gray-600 ">({productDetails.ratingsQuantity} reviews )</span>

//                     </div>
//                     <p className="mb-5 font-semibold text-4xl ">{productDetails.price} EGP</p>
//                     <p className="mb-5 text-gray-500">{productDetails.description}</p>

//                     <h2 className="text-gray-600 text-xl font-medium">Quantity</h2>

//                     <div className="count flex  gap-2 my-3">
//                         <Button onClick={() => {
//                             if (count > 1) {
//                                 setCount(count - 1)
//                             }
//                         }}>
//                             <FaCircleMinus className="text-green-500 text-2xl " />
//                         </Button>


//                         <input className="w-[20%] text-center" type="number" value={count} onChange={() => setCount(count)} />


//                         <Button onClick={() => {
//                             if (count < productDetails.quantity) {
//                                 setCount(count + 1)
//                             }
//                         }}><IoAddCircleSharp className="text-green-500 text-3xl " /></Button>
//                     </div>
//                     <div className="flex items-center justify-between  gap-2  my-5">
//                         <h3 className="font-medium text-xl mb-5  text-gray-500 ">Total Price</h3>
//                         <p className="text-2xl mb-5 font-semibold  px-5  text-green-500">{productDetails.price * count} EGP</p>

//                     </div>
//                     <div className="py-5 flex justify-center items-center w-full gap-3 ">
//                         <div className="w-full ">

//                             <AddToCartButton
//                                 product={{
//                                     id: productDetails._id,
//                                     title: productDetails.title,
//                                     price: productDetails.price,
//                                     imageCover: productDetails.imageCover,
//                                     // category:
//                                     //     typeof productDetails.category === "string"
//                                     //         ? productDetails.category
//                                     //         : productDetails.category?.name,
//                                 }}
//                                 className="w-full"
//                             />



//                         </div>
//                         <div className="w-full">
//                             <MyButton className=" bg-black text-xl text-white  w-full hover:bg-black" >
//                                 <MdElectricBolt />
//                                 <p>Buy Now</p>
//                             </MyButton>
//                         </div>

//                     </div>
//                     <div className="my-3 me-3 flex gap-3">
//                         <div className="w-full ">

//                             <WishlistButton
//                                 product={productDetails}
//                                 className="w-full"
//                             />
//                         </div>

//                         <div>
//                             <MyButton className="bg-white font-medium text-gray-500 border-2 border-gray-300  w-full hover:bg-transparent  hover:border-green-500 hover:text-green-500">
//                                 <FaShareNodes />

//                             </MyButton>
//                         </div>
//                     </div>
//                 </div>
//             </div>




//         </div>
//     )
}
