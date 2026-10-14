import { getCategories } from "@/api/category.api"
import { Category } from "@/interfaces/products"
import CategoryCard from "../categoryCard/CategoryCard"

export default async function CategorySection() {
  const categoriesData: Category[] = await getCategories()





  return <>
     

      <div className="grid gap-6 grid-cols-2 md:grid-cols-5 lg:grid-cols-6  mt-5 ">
        {
          categoriesData.map((category: Category) => {
            return (
              <CategoryCard key={category._id} category={category}  />
            )
          })
        }
      </div>

  </>
}
