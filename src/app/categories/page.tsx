
import { getCategories } from "@/api/category.api";
import { Category } from "@/interfaces/products";
import { FaLayerGroup } from "react-icons/fa";
import SectionHeader from "../_components/sectionHeader/SectionHeader";
import CategorySection from "../_components/categorySection/CategorySection";

export default async function Categories() {

  const categoriesData: Category[] = await getCategories()






  return <>
    <SectionHeader title="All Categories" bgColor="bg-linear-to-r from-green-600 via-green-500 to-green-400" Icon={FaLayerGroup} icons='icons' desc="Browse our wide range of product categories" />

    <div className='container w-[90%] mx-auto'>

      <CategorySection />


    </div>



  </>


}
