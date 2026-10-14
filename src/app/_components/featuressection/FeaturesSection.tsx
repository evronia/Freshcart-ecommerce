import { PiVanFill } from "react-icons/pi";
import { FaRotateLeft } from "react-icons/fa6";
import { FaShieldAlt, FaHeadset } from "react-icons/fa";
import FeaturesItem from "../featuresitems/FeaturesItem";

export default function FeaturesSection() {
  return <>

    <div className="bg-[#F0FDF4] w-full mt-10">
      <div className="container mx-auto py-7">

        <div className="grid lg:grid-cols-4 gap-4  md:grid-cols-2 sm:grid-cols-1">

          <FeaturesItem Icon={PiVanFill} title="Free Shipping" subtitle="On orders over 500 EGP" iconColor="text-[#16a34a]" iconBg="bg-[#DCFCE7]" />
          <FeaturesItem Icon={FaRotateLeft} title="Easy Returns" subtitle="14-day return policy" iconColor="text-[#16a34a]"iconBg="bg-[#DCFCE7]" />
          <FeaturesItem Icon={FaShieldAlt} title="Secure Payment" subtitle="100% secure checkout" iconColor="text-[#16a34a]"iconBg="bg-[#DCFCE7]" />
          <FeaturesItem Icon={FaHeadset} title="24/7 Support" subtitle="Contact us anytime" iconColor="text-[#16a34a]"iconBg="bg-[#DCFCE7]" />



        </div>

      </div>


    </div>






  </>
}
