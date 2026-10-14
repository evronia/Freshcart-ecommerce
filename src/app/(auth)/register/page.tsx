"use client"
import { useForm, Controller } from 'react-hook-form'
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  FaGoogle,
  FaFacebook,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUserPlus,
} from "react-icons/fa";

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

import * as zod from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { registerScema } from '@/schema/registerSchema'
import { registerUserAPI } from '@/api/register.api'

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from 'next/link';

type RegisterSchemaType = zod.infer<typeof registerScema>


export default function Register() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<RegisterSchemaType>({

    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    mode: "onChange",
    resolver: zodResolver(registerScema)

  })


  async function handelRegister(values: RegisterSchemaType) {

    try {
      const res = await registerUserAPI(values);
      toast.success("Account created successfully");
      router.push("/login");
      console.log("Register response:", res);
      
    } catch (error) {
    
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  return <>

    <main className="min-h-screen bg-white px-6 py-8 ">
      <div className="mx-auto container grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

        {/* ================= LEFT SIDE ================= */}
        <section className="pt-20 ">

          {/* Heading */}
          <h1 className="text-4xl font-bold text-[#243B5A]">
            Welcome to{" "}
            <span className="text-[#16A34A]">FreshCart</span>
          </h1>

          <p className="mt-2 text-xl font-medium  text-[#243B5A]">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          {/* Features */}
          <div className="mt-6 space-y-4">

            {/* Premium Quality */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] text-[#16A34A]">
                <FaStar size={16} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#243B5A]">
                  Premium Quality
                </h3>
                <p className="text-sm text-[#52647A]">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            {/* Fast Delivery */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] text-[#16A34A]">
                <FaTruck size={16} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#243B5A]">
                  Fast Delivery
                </h3>
                <p className="text-sm text-[#52647A]">
                  Same-day delivery available in most areas
                </p>
              </div>
            </div>

            {/* Secure Shopping */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] text-[#16A34A]">
                <FaShieldAlt size={16} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#243B5A]">
                  Secure Shopping
                </h3>
                <p className="text-sm text-[#52647A]">
                  Your data and payments are completely secure
                </p>
              </div>
            </div>

          </div>

          {/* ================= TESTIMONIAL ================= */}
          <div className="mt-7 me-5 rounded-md border border-gray-200 bg-white p-3 shadow-sm">

            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDE68A] text-lg">
                👩🏻
              </div>

              <div>
                <p className="text-sm font-medium text-[#243B5A]">
                  Sarah Johnson
                </p>

                <div className="flex gap-0.5 text-[#FACC15]">
                  <FaStar size={12} />
                  <FaStar size={12} />
                  <FaStar size={12} />
                  <FaStar size={12} />
                  <FaStar size={12} />
                </div>
              </div>

            </div>

            <p className="mt-3 text-sm italic font-medium  text-[#52647A]">
              "FreshCart has transformed my shopping experience. The quality
              of the products is outstanding, and the delivery is always on
              time. Highly recommend!"
            </p>

          </div>

        </section>


        {/* ================= RIGHT SIDE ================= */}
        <section className="md:w-full shadow-2xl border rounded-2xl  ">

          <div className="rounded-xl bg-white px-5 py-6 shadow-[0_2px_15px_rgba(0,0,0,0.10)]">

            {/* Form Heading */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#172554]">
                Create Your Account
              </h2>

              <p className="mt-1 text-xl text-[#172554]">
                Start your fresh journey with us today
              </p>
            </div>


            {/* Social Buttons */}
            <div className="mt-7 grid grid-cols-2 gap-2 ">

              <button
                type="button"
                className="flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 text-sm font-bold text-[#243B5A] transition hover:bg-gray-50"
              >
                <FaGoogle className="text-red-500" />
                Google
              </button>

              <button
                type="button"
                className="flex h-8 items-center  cursor-pointer  justify-center gap-2 rounded-md border border-gray-300 text-sm font-bold text-[#243B5A] transition hover:bg-gray-50"
              >
                <FaFacebook className="text-blue-600" />
                Facebook
              </button>

            </div>


            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-sm text-gray-500">
                or
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>


            {/* ================= FORM ================= */}
            <form className="space-y-4" onSubmit={handleSubmit(handelRegister)}>

              {/* Name */}
              <div>
                
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input placeholder='Ali' {...field} id={field.name} aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>


              {/* Email */}
              <div>
                

                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input type="email" placeholder='ale@example.com' {...field} id={field.name} aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>


              {/* Password */}
              <div>
                

                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>password</FieldLabel>
                      <Input placeholder='created a strong password' type="password" {...field} id={field.name} aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />


                <p className="mt-1 text-xs text-[#697482]">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </div>


              {/* Confirm Password */}
              <div>
                


                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Password confirmation</FieldLabel>
                      <Input placeholder='confirm your password' type="password" {...field} id={field.name} aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>


              {/* Phone */}
              <div>
               

                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>phone</FieldLabel>
                      <Input placeholder='+1 234 567 8900' type='tel' {...field} id={field.name} aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>


              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">

                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 h-3 w-3 accent-[#16A34A]"
                />

                <label
                  htmlFor="terms"
                  className="text-[12px] font-medium  text-[#52647A]"
                >
                  I agree to the{" "}
                  <span className="text-[#16A34A]">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#16A34A]">
                    Privacy Policy
                  </span>{" "}
                  <span >*</span>
                </label>

              </div>


              {/* Create Account */}
              <Button
                type="submit"
                className="cursor-pointer flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#16A34A] text-base font-medium text-white transition hover:bg-[#15803D]"
              >
                <FaUserPlus size={18} />
                Create My Account
              </Button>

            </form>


            {/* Bottom Divider */}
            <div className="my-3 h-px bg-gray-200" />

            {/* Login */}
            <p className="text-center text-[15px] text-[#52647A]">
              Already have an account?{" "}
              <Link href={'/login'}

                className="font-bold cursor-pointer bg-transparent hover:bg-transparent text-[#16A34A]"
              >
                Sign In
              </Link>
            </p>

          </div>

        </section>

      </div>
    </main>





  </>
}
