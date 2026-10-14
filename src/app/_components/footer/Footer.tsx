import Image from 'next/image'
import { FaFacebookF, FaHome, FaInstagram, FaLinkedin, FaCreditCard } from 'react-icons/fa'
import { IoCall } from "react-icons/io5";
import { BiMessage } from "react-icons/bi";
import { FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
    return <>
        <div className=' bg-[#101828] py-5'>
            <div className='container mx-auto w-[90%]  mb-5'>
                <div className="grid  gap-4 lg:grid-cols-6 md:grid-cols-2 ">
                    <div className='mt-5 col-start-1 col-end-3 '>
                        <Image className='bg-white rounded-xl block px-5 py-3' src={"/assets/images/freshcart-logo.49f1b44d.svg"} alt="" width={200} height={150} />
                        <p className='text-[#99A1AF] text-[14px] my-5'>FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.</p>
                        <div className='flex flex-col gap-2 my-2'>
                            <a href=""> <div className='flex items-center gap-2 text-[14px]  text-[#99A1AF] transition-colors duration-500 hover:text-green-500'><IoCall className='text-green-500' />+18001234567 </div> </a>
                            <a href=""> <div className='flex items-center gap-2 text-[14px] text-[#99A1AF] transition-colors duration-500 hover:text-green-500'><BiMessage className='text-green-500' /> support@freashcart.com </div></a>
                            <a href=""> <div className='flex items-center gap-2 text-[14px] text-[#99A1AF] transition-colors duration-500 hover:text-green-500'><FaHome className='text-green-500' />123 Commerce Street, New York, NY 10001</div> </a>

                        </div>
                        <div className='flex gap-2 my-5'>
                            <div className='text-[#99A1AF] h-10 w-10 rounded-full bg-[#1E2939] flex items-center justify-center hover:bg-green-500 hover:text-white  transition-colors duration-500 cursor-pointer '>
                                <FaFacebookF />
                            </div>
                            <div className='text-[#99A1AF] h-10 w-10 rounded-full bg-[#1E2939] flex items-center justify-center hover:bg-green-500 hover:text-white  transition-colors duration-500 cursor-pointer '>
                                <FaXTwitter />
                            </div>
                            <div className='text-[#99A1AF] h-10 w-10 rounded-full bg-[#1E2939] flex items-center justify-center hover:bg-green-500 hover:text-white  transition-colors duration-500 cursor-pointer '>
                                <FaInstagram />
                            </div>
                            <div className='text-[#99A1AF] h-10 w-10 rounded-full bg-[#1E2939] flex items-center justify-center  hover:bg-green-500 hover:text-white  transition-colors duration-500 cursor-pointer'>
                                <FaLinkedin />
                            </div>
                        </div>
                    </div>
                    <div className='mt-5  '>
                        <h3 className='font-semibold mb-5 text-lg text-white '>Shop</h3>
                        <ul className='mt-5'>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>All Products</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Categories</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Brands</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Electronics</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Men's Fashion</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Women's Fashion</li>
                        </ul>
                    </div>
                    <div className='mt-5'>
                        <h3 className='font-semibold mb-5 text-lg text-white'>Account</h3>
                        <ul className='mt-5'>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>My Account</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Order History</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Wishlist</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Shopping Cart</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Sign In</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Create Account</li>
                        </ul>
                    </div>
                    <div className='mt-5'>
                        <h3 className='font-semibold mb-5 text-lg text-white'>Support</h3>
                        <ul className='mt-5'>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Contact Us</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Help Center</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Shipping Info</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Returns & Refunds</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Track Order</li>
                        </ul>
                    </div>
                    <div className='mt-5'>
                        <h3 className='font-semibold mb-5 text-lg  text-white'>Legal</h3>
                        <ul className='mt-5'>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Privacy Policy</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Terms of Service</li>
                            <li className='mb-2 text-[#99A1AF] text-[14px] transition-colors duration-500 hover:text-green-500 cursor-pointer'>Cookie Policy</li>

                        </ul>
                    </div>

                </div>
                <div className='  pt-5 border-t-2 border-[#99A1AF] '>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2   '>
                        <div >
                            <p className='text-[#99A1AF]  text-[14px] '>
                                &copy; 2025 FreshCart. All rights reserved.
                            </p>
                        </div>
                        <div className='flex items-center gap-3 text-[#99A1AF] md:ms-auto'>
                            <p className='flex items-center gap-2'><FaCreditCard /> Visa</p>
                            <p className='flex items-center gap-2'> <FaCreditCard />Mastercard</p>
                            <p className='flex items-center gap-2'><FaCreditCard />Paypal</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </>
}
