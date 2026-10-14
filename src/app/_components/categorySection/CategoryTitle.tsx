import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function CategoryTitle() {
  return <>

        <div className="flex justify-between items-center my-10">
        <div className='relative'>
          <h2 className="text-3xl font-bold rounded-2xl  ml-6 before:content-[''] before:absolute before:left-3 before:top-0 before:w-2 before:h-9 before:bg-green-700 px-2 before:rounded-t-3xl before:rounded-b-3xl ">Shop By <span className="text-green-700">Category</span></h2>
        </div>
        <Link href="/categories" className='flex items-center gap-2 ml-4 text-green-600  cursor-pointer hover:text-green-700 '>
          <div className="">
            <h2 className="text-xl font-medium   ">View All Categories </h2>
          </div>
          <div className="   rounded-full"><FaArrowRight className="text-lg " /></div>
        </Link>


      </div>
  </>
}
