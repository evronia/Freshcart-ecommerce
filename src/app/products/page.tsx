import {  FaBoxOpen } from "react-icons/fa";

import { Iproducts } from "@/interfaces/products"
// import { FaCirclePlus, FaArrowRotateRight } from "react-icons/fa6";
// import { CiHeart } from "react-icons/ci";
// import { IoEyeOutline } from "react-icons/io5";
// import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import SingleProduct from "../_components/singleProduct/SingleProduct";
import { getProducts } from "@/api/products.api";
import SectionHeader from "../_components/sectionHeader/SectionHeader";
// import FeaturesSection from "../_components/featuressection/FeaturesSection";

export default async function Products() {
    //call api to get products
    const productsData = await getProducts()




    // function to render rating stars
    // function RatingStars({ rating }: { rating: number }) {
    //     const stars = [];

    //     for (let i = 1; i <= 5; i++) {
    //         if (i <= Math.floor(rating)) {
    //             // نجمة كاملة
    //             stars.push(
    //                 <FaStar
    //                     key={i}
    //                     className="text-yellow-500"
    //                 />
    //             );
    //         } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
    //             // نصف نجمة
    //             stars.push(
    //                 <FaStarHalfAlt
    //                     key={i}
    //                     className="text-yellow-500"
    //                 />
    //             );
    //         } else {
    //             // نجمة فاضية
    //             stars.push(
    //                 <FaRegStar
    //                     key={i}
    //                     className="text-yellow-500"
    //                 />
    //             );
    //         }
    //     }

    //     return (
    //         <div className="flex items-center gap-1">
    //             {stars}
    //             <span className="text-sm text-gray-500 ml-1">
    //                 {rating}
    //             </span>
    //         </div>
    //     );
    // }







    return <>

        <SectionHeader title="All Products" bgColor="bg-linear-to-r from-green-600 via-green-500 to-green-400" Icon={FaBoxOpen} icons='icons' desc="Explore our complete product collection"/>
        <p className= "text-gray-500 font-medium ml-30 mt-5">
            Showing {productsData.length} products
        </p>
        

    
    <div className="container mx-auto w-[90%] grid gap-5  md:grid-cols-4 lg:grid-cols-5  mt-5">

    
    {
        productsData.map((product: Iproducts) => {
            return <SingleProduct key={product._id} product={product} />
        })
    }
</div>

    </>



}
