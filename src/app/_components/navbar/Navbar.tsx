"use client"

import * as React from "react"
import Link from "next/link"

import { MdOutlineHeadsetMic } from "react-icons/md";


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { FaBars, FaHeart } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import logo from "@/images/freshcart-logo.49f1b44d.svg"
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import CartNavLink from "../cart/CartNavLink";



export function Navbar() {
    const { data: session, status } = useSession()

    return (
        <div className=" bg-gray-100 shadow-md z-50 sticky top-0 ">
            <NavigationMenu className={"container w-[90%] mx-auto max-w-full justify-between  py-2"}>
                <NavigationMenuList className={"justify-between"}>

                    <div>
                        <img className="w-40 " src={logo.src} alt="logo" />
                    </div>
                    <div className="w-1/4 hidden md:block">
                        <input type="search" className="bg-gray-100 border-2 border-gray-300 rounded-2xl px-2 py-1 w-full  placeholder:text-sm " placeholder="Search for products, brands and more..." />
                    </div>
                    <div className="md:flex gap-x-4 hidden " >
                        <NavigationMenuItem className=" font-medium hover:text-green-500 transition-all duration-300 cursor-pointer">
                            <Link href="/">Home</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className=" font-medium hover:text-green-500 transition-all duration-300 cursor-pointer">
                            <Link href="/products">Shops</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className=" font-medium hover:text-green-500 transition-all duration-300 cursor-pointer">
                            <Link href="/brands">Brands</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className=" font-medium hover:text-green-500 transition-all duration-300 cursor-pointer">
                            <Link href="/categories">Categories</Link>
                        </NavigationMenuItem>




                    </div>


                    <div className="hidden md:flex gap-x-4 items-center ">

                        <div className=" md:flex hidden border-r-2 border-gray-400 px-2">

                            <Link href="/contact" className="flex gap-2 items-center ">
                                <MdOutlineHeadsetMic className="text-green-500 hover:text-green-600 transition-all duration-300 cursor-pointer text-2xl " />
                                <div>
                                    <p className="text-[10px] text-center text-gray-500" >Support</p>
                                    <span className="font-medium text-[14px]  text-black *:">24/7  Help</span>
                                </div>
                            </Link>


                        </div>

                        <div className="flex gap-2 items-center ">
                            <NavigationMenuItem className=" font-medium hover:text-green-500 transition-all duration-300 cursor-pointer">
                                <Link href="/wishlist">
                                    <FaHeart className="text-gray-500 hover:text-green-500 transition-all duration-300 cursor-pointer text-2xl " />
                                </Link>
                            </NavigationMenuItem>
                            {session && <NavigationMenuItem className=" font-medium hover:text-green-500 transition-all duration-300 cursor-pointer">
                                    <CartNavLink />

                            </NavigationMenuItem>}

                            {!session && <NavigationMenuItem className=" font-medium hover:text-green-500 transition-all duration-300 cursor-pointer">

                                <Button onClick={() => signIn()} className=" bg-green-500 hover:bg-green-700 transition-all duration-300 cursor-pointer me-3"> Login </Button>

                            </NavigationMenuItem>
                            }
                            {session && <NavigationMenuItem className=" font-medium hover:text-green-500 transition-all duration-300 cursor-pointer">
                                <Link href="/profile">
                                    <Button className=" bg-gray-400 hover:bg-gray-500 transition-all duration-300 cursor-pointer me-3"> {session?.user.name} </Button>
                                </Link>
                            </NavigationMenuItem>
                            }
                        </div>

                    </div>


                    <NavigationMenuItem className="md:hidden  rounded-full ">
                        <NavigationMenuTrigger className=" w-10 h-10 rounded-full flex justify-center items-center    " >
                            <FaBars className="text-green-500 " size={50} />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="w-96">
                                <ListItem href="/" title="Home" >
                                </ListItem>
                                {session && <ListItem href="/cart" title="cart">
                                </ListItem>}
                                <ListItem href="/products" title="Shops">
                                </ListItem>
                                <ListItem href="/brands" title="Brands">
                                </ListItem>
                                <ListItem href="/categories" title="Categories">
                                </ListItem>
                                {session && <ListItem href="/profile" title="profile">
                                </ListItem>}
                                {!session && <ListItem href="" title="" >
                                   <Link href="/login">
                                    <Button className=" bg-green-500 hover:bg-green-700 transition-all duration-300 cursor-pointer me-3 w-full"> Login </Button>
                                </Link>
                                </ListItem>}
                                {!session && <ListItem href="" title=""  >
                                    <Link href="/register"  >
                                        <Button className="  bg-green-500 hover:bg-green-700 transition-all duration-300 cursor-pointer me-3 w-full"> Sin up </Button>
                                    </Link>
                                </ListItem>}

                                {session && <ListItem href="" title="" onClick={() => signOut({ callbackUrl: "/" })}>
                                    <button className="flex items-center gap-2 w-full cursor-pointer  hover:text-red-500 transition-all duration-300">
                                        <LogOut />
                                        <span>sign out</span>
                                    </button>


                                </ListItem>}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>


                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink render={<Link href={href}><div className=" flex flex-col gap-1 text-sm">
                <div className="leading-none font-medium">{title}</div>
                <div className="line-clamp-2 text-muted-foreground">{children}</div>
            </div></Link>} />
        </li>
    )
}
