"use client"
import { useForm, Controller } from 'react-hook-form'
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  Mail,
  LockKeyhole,
  Truck,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

import * as zod from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schema/loginSchema'

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Feature } from '@/app/_components/feature/Feature';
import loginImg from "../../../../public/assets/images/loginImage.png"
import Link from 'next/link';
import { signIn } from 'next-auth/react';

type loginSchemaType = zod.infer<typeof loginSchema>


export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit } = useForm<loginSchemaType>({

    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginSchema)

  })




  
async function handelLogin(values: loginSchemaType) {
  setIsLoading(true);

  try {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });


    if (res?.ok && !res.error) {
      toast.success("you loged in successfully");
      router.push("/");
      router.refresh();
    } else {
      toast.error(res?.error || "login feiled");
    }
  } catch (error) {
    toast.error( error instanceof Error ? error.message : "Something went wrong");
  } finally {
    setIsLoading(false);
  }
}


  return <>
  
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-362.5 items-center justify-center px-4 py-8 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <section className="hidden md:flex  flex-col items-center text-center">

            {/* Grocery Image */}
            <div className="relative w-full max-w-167.5 overflow-hidden rounded-2xl shadow-md">
              <img
                src={loginImg.src}
                alt="FreshCart groceries"
                className="h-102.5 w-full object-cover object-center"
              />
            </div>

            {/* Text */}
            <div className="mt-6 max-w-170">
              <h1 className="text-[28px] font-bold leading-tight text-[#172554] md:text-[32px]">
                FreshCart - Your One-Stop Shop for Fresh
                <br className="hidden md:block" />
                Products
              </h1>

              <p className="mt-5 text-[18px] leading-8 text-[#29466b]">
                Join thousands of happy customers who trust FreshCart for
                their daily grocery needs
              </p>
            </div>

            {/* Features */}
            <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-4">
              <Feature
                icon={<Truck size={16} strokeWidth={2.5} />}
                text="Free Delivery"
              />

              <Feature
                icon={<ShieldCheck size={16} strokeWidth={2.5} />}
                text="Secure Payment"
              />

              <Feature
                icon={<Clock3 size={16} strokeWidth={2.5} />}
                text="24/7 Support"
              />
            </div>
          </section>

          <section className="flex justify-center shadow-2xl border rounded-2xl">
            <div className="w-full max-w-167.5 rounded-2xl bg-white px-7 py-10 shadow-[0_5px_30px_rgba(0,0,0,0.04)] md:px-12 lg:px-14">
              <div className="text-center">
                <h2 className="text-[32px] font-bold">
                  <span className="text-[#16a34a]">Fresh</span>
                  <span className="text-[#172554]">Cart</span>
                </h2>

                <h3 className="mt-3 text-[26px] font-bold text-[#172554]">
                  Welcome Back!
                </h3>

                <p className="mt-2 text-[17px] text-[#29466b]">
                  Sign in to continue your fresh shopping experience
                </p>
              </div>
              {/* Social Login */}
              <div className="mt-10 space-y-3">

                <button
                  type="button"
                  className="cursor-pointer flex h-13.75 w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white text-[17px] font-medium text-[#172554] transition hover:bg-gray-50"
                >
                  <span className="text-[23px] font-bold text-[#ea4335]">
                    G
                  </span>

                  Continue with Google
                </button>

                <button
                  type="button"
                  className="cursor-pointer flex h-13.75 w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white text-[17px] font-medium text-[#172554] transition hover:bg-gray-50"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                    <FaFacebookF size={12} />
                  </span>

                  Continue with Facebook
                </button>

              </div>
              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="whitespace-nowrap text-sm text-[#52627a]">
                  OR CONTINUE WITH EMAIL
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <form className='space-y-3' onSubmit={handleSubmit(handelLogin)} >

                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>

                      <FieldLabel className='mb-2 block text-[15px] font-semibold text-[#172554]' htmlFor={field.name}>                    Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Mail
                          size={19}
                          className="absolute left-4 top-[50%] -translate-y-1/2 text-gray-400" />

                        <Input type="email" placeholder='Enter your email' className=" h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-[16px]  outline-none transition placeholder:text-gray-400 focus:ring-2 " {...field} id={field.name} aria-invalid={fieldState.invalid} />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <FieldLabel className='mb-2 block text-[15px] font-semibold text-[#172554]' htmlFor={field.name}>password</FieldLabel>
                          <button
                            type="button"
                            className="text-[15px] font-medium text-[#16a34a] cursor-pointer hover:underline"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <LockKeyhole
                            size={19}
                            className="absolute left-4 top-[50%] -translate-y-1/2 text-gray-400" />

                          <Input type="password" placeholder='Enter your password' className=" h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-[16px]  outline-none transition placeholder:text-gray-400 focus:ring-2 "


                            {...field} id={field.name} aria-invalid={fieldState.invalid} />
                        </div>


                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                      </div>
                    </Field>
                  )}
                />
                {/* Remember Me */}
                <div className="flex items-center gap-3">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-[#16a34a]"
                  />

                  <label
                    htmlFor="remember"
                    className="text-[15px] text-[#172554]"
                  >
                    Keep me signed in
                  </label>
                </div>
                {/* Sign In */}
                <Button
                  type="submit"
                  className="cursor-pointer h-14 w-full rounded-xl bg-[#16a34a] text-[18px] font-bold text-white shadow-md transition hover:bg-[#15803d] active:scale-[0.99]"
                >
                  Sign In
                </Button>
               

              </form>

              {/* Bottom Divider */}
              <div className="mt-9 border-t border-gray-200 pt-7 text-center">
                <p className="text-[16px] text-[#29466b]">
                  New to FreshCart?{" "}
                  <Link href="/register"

                    className="cursor-pointer font-semibold text-[#16a34a] hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </section>






        </div>
      </div>
    </main>








  </>
}
