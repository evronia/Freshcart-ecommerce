import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function proxy(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })


    if (token) {
        // request.headers.set('Authorization', `Bearer ${token}`)

        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/login', request.url))
    }

}
export const config = {
    matcher: [
        "/cart",
        "/checkout",
        "/profile",
        "/products/:path*"

    ],
}