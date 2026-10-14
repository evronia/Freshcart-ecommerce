"use client"
import { FaVanShuttle, FaUserPlus } from "react-icons/fa6";
import { FaGift, FaPhoneAlt } from "react-icons/fa";
import { CiMail, CiUser } from "react-icons/ci";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {  LogOut } from "lucide-react";



export default function TopBar() {
        const { data: session, status } = useSession()
    
    return <>

        <div className="  bg-gray-100 ">



            <div className=' hidden lg:flex text-gray-500 text-sm justify-between items-center px-4 py-2 container mx-auto'>
                <div className="flex items-center gap-x-2" >
                    {/* right content */}
                    <span className="flex items-center gap-x-2 text-sm" ><FaVanShuttle className="text-green-500" /> Free shipping on Orders 500 EGP</span>
                    <span className="flex items-center gap-x-2"> <FaGift className="text-green-500" /> New Arrivals Daily </span>
                </div>

                <div className='flex gap-x-4 items-center'>
                    {/* left content */}
                    <div className="flex gap-x-3 items-center">
                        <span className="cursor-pointer flex x gap-x-2 items-center hover:text-green-500 transition-all duration-300"><FaPhoneAlt /> +20 100 000 0000 </span>
                        <span className="cursor-pointer flex gap-x-2 items-center  hover:text-green-500 transition-all duration-300"><CiMail /> support@freshcart.com </span>
                    </div>
                    <span> | </span>

                {!session && <div className="flex gap-x-3 items-center">
                        <Link href="/login" className="flex gap-x-2 items-center  hover:text-green-500 transition-all duration-300"><CiUser /> Sign in  </Link>
                        <Link href="/register" className="flex gap-x-2 items-center  hover:text-green-500 transition-all duration-300"> <FaUserPlus /> sing up  </Link>
                    </div>
                }
                {session && <div className="flex gap-x-3 items-center">
                        <Link href="/profile" className="flex gap-x-2 items-center  hover:text-green-500 transition-all duration-300"><CiUser /> {session?.user?.name}  </Link>
                    </div>
                }
                {session && <span onClick={() => signOut({callbackUrl:"/"})} className="cursor-pointer ms-auto block  text-gray-500  font-semibold  sm:w-auto">
                      <span className="flex items-center gap-x-1 hover:text-red-500 transition-all duration-300">  Logout
                      <LogOut/> 
                      </span>

                    </span>
                }
                </div>
            </div>

        </div>


    </>


}
