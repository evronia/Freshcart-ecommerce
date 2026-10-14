import SectionHeader from "../_components/sectionHeader/SectionHeader";
import { FaTags } from "react-icons/fa6";
import { getBrands } from "@/api/brands.api";
import { Brand } from "@/interfaces/products";
import BrandCard from "../_components/brandsComponents/BrandCard";
import { getMyToken } from "@/utilities/getMyToken";

export default async function BrandsPage() {

    const brands = await getBrands();

    const token = await getMyToken()
    console.log("myToken", token);
    return (
        <>
            <SectionHeader title="Top Brands" bgColor="bg-linear-to-r from-violet-600 via-violet-500 to-violet-400" Icon={FaTags} icons='text-white' iconBg='bg-violet-500' desc="Shop from your favorite brands" />

            <div className="container mx-auto w-[90%] grid gap-5 md:grid-cols-4 lg:grid-cols-5  mt-10">
                {
                    brands.map((brand: Brand) => {
                        return <BrandCard key={brand._id} id={brand._id} name={brand.name} image={brand.image} />
                    })
                }
            </div>


        </>
    )
}
