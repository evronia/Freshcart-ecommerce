import { getProducts } from "@/api/products.api"
import SingleProduct from "./_components/singleProduct/SingleProduct";
import { Iproducts } from "@/interfaces/products";
import { MySlider } from "./_components/myslider/MySlider";
import FeaturesItem from "./_components/featuresitems/FeaturesItem";
import { PiVanFill } from "react-icons/pi";
import { FaRotateLeft } from "react-icons/fa6";
import { FaHeadset, FaShieldAlt } from "react-icons/fa";
import CategorySection from "./_components/categorySection/CategorySection";
import CategoryTitle from "./_components/categorySection/CategoryTitle";
import PromoCards from "./_components/promoCards/PromoCards";
import NewsletterSection from "./_components/newsletter/NewsletterSection";

export default async function Home() {

  const data = await getProducts()
  return <>

    <MySlider />

    <div className="bg-gray-100 py-10">
      <div className="container mx-auto grid lg:grid-cols-4  md:grid-cols-2 sm:grid-cols-1 gap-2  py-3   ">
        <div className="rounded-xl  shadow-lg shadow-gray-300 bg-white px-1 py-2 ">
          <FeaturesItem Icon={PiVanFill} iconColor="text-[#2B7FFF]" title="Free Shipping" subtitle="On orders over 500 EGP" iconBg="bg-[#FEF2F2]" />
        </div>
        <div className="rounded-xl shadow-lg shadow-gray-300  bg-white px-1 py-2">
          <FeaturesItem Icon={FaShieldAlt} iconColor="text-[#16a34a]" title="Easy Returns" subtitle="14-day return policy" iconBg="bg-[#ECFDF5]" />
        </div>
        <div className="rounded-xl shadow-lg shadow-gray-300  bg-white px-1 py-2 ">
          <FeaturesItem Icon={FaRotateLeft} iconColor="text-[#FF6900]" title="Secure Payment" subtitle="100% secure checkout" iconBg="bg-[#F3F4F6]" />
        </div>
        <div className="rounded-xl shadow-lg shadow-gray-300   bg-white px-1 py-2 ">
          <FeaturesItem Icon={FaHeadset} iconColor="text-[#AD46FF]" title="24/7 Support" subtitle="Contact us anytime" iconBg="bg-[#F9FAFB]" />
        </div>
      </div>


    </div>
    <main className='container w-[90%] mx-auto'>
      <CategoryTitle />
      <CategorySection />
      <PromoCards />
      <div className="flex justify-between items-center  mt-10">
        <div className='relative'>
          <h2 className="text-3xl font-bold rounded-2xl  ml-6 before:content-[''] before:absolute before:left-3 before:top-0 before:w-2 before:h-9 before:bg-green-700 px-2 before:rounded-t-3xl before:rounded-b-3xl ">Featured<span className="text-green-700 ml-2">Products</span></h2>
        </div>



      </div>
      <div className=" grid gap-5  md:grid-cols-4 lg:grid-cols-5  mt-5">


        {
          data.map((product: Iproducts) => {
            return <SingleProduct key={product._id} product={product} />
          })
        }
      </div>
      <NewsletterSection />
    </main>



  </>




}
