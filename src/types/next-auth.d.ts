import NextAuth, { DefaultSession , User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface Session {
        user: {
          id:string,
            role: string,
            email: string,
            name: string
        } & DefaultSession["user"]
    }

    interface User {
        user: {
            role: string,
            email: string,
            name: string,
              id: string ,
        },
        token: string,
        id: string,
    }
}

declare module "next-auth/jwt" {
  interface JWT extends User{
    

}
}