
import {
  ShoppingCart,
  Home,
  ArrowLeft,
  Apple,
  Carrot,
  Leaf,
} from "lucide-react";
import Link from "next/link";

export default function Not_Found() {

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfcfc] px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_35%,rgba(74,222,128,0.12),transparent_40%)]" />

      <div className="pointer-events-none absolute inset-0 select-none">
        <Apple className="absolute left-[6%] top-[12%] h-8 w-8 fill-green-200 text-green-200 opacity-80 sm:h-10 sm:w-10" />

        <Carrot className="absolute right-[10%] top-[22%] h-8 w-8 rotate-[-25deg] text-green-200 opacity-60 sm:h-10 sm:w-10" />

        <Leaf className="absolute left-[15%] top-[58%] h-7 w-7 rotate-[-25deg] fill-green-200 text-green-200 opacity-60" />

        <Apple className="absolute bottom-[12%] left-[8%] h-8 w-8 rotate-[-20deg] fill-green-200 text-green-200 opacity-60" />

        <Leaf className="absolute right-[8%] top-[49%] h-7 w-7 rotate-25 fill-green-200 text-green-200 opacity-60" />

        <Carrot className="absolute bottom-[10%] right-[12%] h-8 w-8 rotate-25 text-green-200 opacity-60" />
      </div>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative mb-12 mt-2 sm:mb-14">
          <div className="flex h-40 w-56 items-center justify-center rounded-[28px] border border-white/80 bg-white/70 shadow-[0_20px_50px_rgba(22,163,74,0.10)] backdrop-blur-sm sm:h-48 sm:w-72">
            <ShoppingCart
              aria-hidden="true"
              strokeWidth={2.8}
              className="h-20 w-20 fill-green-400 text-green-400 sm:h-24 sm:w-24"
            />
          </div>

          {/* 404 badge */}
          <div className="absolute -right-5 -top-6 flex h-24 w-24 items-center justify-center rounded-full border-[7px] border-white bg-linear-to-br from-green-500 to-green-600 text-3xl font-black text-white shadow-[0_12px_25px_rgba(22,163,74,0.25)] sm:-right-8 sm:-top-8 sm:h-32 sm:w-32 sm:border-[9px] sm:text-4xl">
            404
          </div>

          {/* Cute face */}
          <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-5 text-green-400">
            <span className="h-3 w-3 rounded-full bg-current" />
            <span className="h-4 w-9 rounded-b-full border-b-[3px] border-green-400" />
            <span className="h-3 w-3 rounded-full bg-current" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Oops! Nothing Here
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-9 md:text-xl">
          Looks like this page went out of stock! Don't worry,
          there's plenty more fresh content to explore.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-4 sm:mt-10 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href={"/"}
            className="inline-flex min-h-10 items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-4 text-base font-bold text-white shadow-[0_10px_20px_rgba(22,163,74,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300 sm:min-h-20 sm:px-10 sm:text-xl"
          >
            <Home
              aria-hidden="true"
              className="h-6 w-6 fill-white"
            />
            Go to HomePage
          </Link>

        </div>
      </section>
    </main>
  );
}