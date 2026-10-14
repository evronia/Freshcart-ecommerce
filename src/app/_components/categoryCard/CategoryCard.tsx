import Image from "next/image";
import { Category } from "@/interfaces/products";

interface Props {
    category: Category;
}

export default function CategoryCard({ category }: Props) {
    return <>

            <div className="flex flex-col justify-center items-center shadow-lg shadow-gray-200 bg-white px-1 py-2 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer border-2">
                <div className='rounded-full overflow-hidden border-2'>
                    <Image src={category.image}
                     width={100} height={100}
                      alt={category.name} className="rounded-full  w-full h-full  hover:scale-105 transition-all duration-300" />
                </div>
                <p className="mt-2 text-center">{category.name}</p>

            </div>
           

    </>
}
