"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from "next/link";
import {
    UserRound,
    MapPin,
    Settings,
    ChevronRight,
    Plus,
    Package,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function profile() {
    const { data: session, status } = useSession()
    console.log(session, status);

    return <>
        <main className="min-h-screen bg-slate-50">
            {/* Account Header */}
            <section className="bg-linear-to-r from-green-600 to-green-400 text-white">
                <div className="mx-auto w-[90%] py-8 md:py-12">
                    {/* Breadcrumb */}
                    <nav className="mb-7 flex items-center gap-3 text-sm md:text-base">
                        <Link
                            href="/"
                            className="text-white/80 transition hover:text-white"
                        >
                            Home
                        </Link>

                        <span className="text-white/60">/</span>

                        <span className="font-semibold">My Account</span>
                    </nav>

                    {/* Title */}
                    <div className="flex items-center gap-5">
                        <div className="flex size-20 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/20 shadow-lg">
                            <UserRound className="size-10" strokeWidth={2.5} />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                                My Account
                            </h1>

                            <p className="mt-2 text-base text-white/90 md:text-xl">
                                Manage your addresses and account settings
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Account Content */}
            <section className="mx-auto grid w-[90%] grid-cols-1 items-start gap-8 py-8 lg:grid-cols-[370px_minmax(0,1fr)] lg:py-10">
                {/* Sidebar */}
                <Card className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white py-0 shadow-sm">
                    <CardHeader className="border-b border-slate-100 px-5 py-5">
                        <CardTitle className="text-xl font-bold">
                            My Account
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2 p-3">
                        {/* Active item */}
                        <div
                            className="flex items-center justify-between rounded-2xl bg-green-50 px-4 py-4 text-green-700 transition hover:bg-green-100"
                        >
                            <span className="flex items-center gap-4">
                                <span className="flex size-12 items-center justify-center rounded-xl bg-green-500 text-white">
                                    <MapPin className="size-5 fill-current" />
                                </span>

                                <span className="font-medium">My Addresses</span>
                            </span>

                            <ChevronRight className="size-5 text-green-600" />
                        </div>

                        {/* Settings */}
                        <div

                            className="flex items-center justify-between rounded-2xl px-4 py-4 text-slate-600 transition hover:bg-slate-50"
                        >
                            <span className="flex items-center gap-4">
                                <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                    <Settings className="size-5 fill-current" />
                                </span>

                                <span className="font-medium">Settings</span>
                            </span>

                            <ChevronRight className="size-5 text-slate-400" />
                        </div>

                        {/* Orders */}
                        <Link
                            href="/my-orders"
                            className="flex items-center justify-between rounded-2xl px-4 py-4 text-slate-600 transition hover:bg-slate-50"
                        >
                            <span className="flex items-center gap-4">
                                <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                    <Package className="size-5 fill-current" />
                                </span>

                                <span className="font-medium">My Orders</span>
                            </span>

                            <ChevronRight className="size-5 text-slate-400" />
                        </Link>
                    </CardContent>
                </Card>

                {/* Addresses Section */}
                <div className="min-w-0">
                    {/* Section Header */}
                    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                My Addresses
                            </h2>

                            <p className="mt-2 text-base text-slate-500 md:text-lg">
                                Manage your saved delivery addresses
                            </p>
                        </div>

                        <Button className="h-14 w-full rounded-2xl bg-green-600 px-6 text-base font-semibold shadow-lg shadow-green-600/20 hover:bg-green-700 sm:w-auto">
                            <Plus className="size-5" strokeWidth={2.5} />
                            Add Address
                        </Button>
                    </div>

                    {/* Empty State */}
                    <Card className="flex min-h-105 items-center justify-center rounded-3xl border border-slate-200/70 bg-white px-5 py-10 shadow-none md:min-h-112.5">
                        <CardContent className="flex w-full max-w-lg flex-col items-center p-0 text-center">
                            {/* Icon */}
                            <div className="mb-7 flex size-24 items-center justify-center rounded-full bg-slate-100">
                                <MapPin
                                    className="size-10 fill-slate-400 text-slate-400"
                                    strokeWidth={2}
                                />
                            </div>

                            {/* Empty State Text */}
                            <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                                No Addresses Yet
                            </h3>

                            <p className="mt-4 max-w-md text-base leading-7 text-slate-500 md:text-lg">
                                Add your first delivery address to make checkout
                                faster and easier.
                            </p>

                            {/* Add First Address */}
                            <Button className="mt-8 h-16 w-full max-w-[320px] rounded-2xl bg-green-600 px-5 text-base font-semibold shadow-lg shadow-green-600/20 transition hover:bg-green-700 sm:text-lg">
                                <Plus className="size-6" strokeWidth={2.5} />
                                Add Your First Address
                            </Button>
                        </CardContent>
                    </Card>
                    <button onClick={() => signOut({callbackUrl:"/"})} className="cursor-pointer ms-auto block mt-5 text-white h-14 w-full rounded-2xl bg-green-600 px-6 text-base font-semibold shadow-lg shadow-green-600/20 hover:bg-green-700 sm:w-auto">
                        Logout

                    </button>
                </div>

            </section>
        </main>


    </>
    // <div>

    //     <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
    // </div>

}
