import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


export const authOptions: NextAuthOptions = {

  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: { placeholder: "enter your email ", type: "email" },
        password: { placeholder: "enter your password", type: "password" },
      },

      async authorize(credentials) {
        const response = await fetch(
          `${process.env.API}/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        const payload = await response.json();

        if (!response.ok || payload.message !== "success") {
          throw new Error(payload.message || "Login failed");
        }

        const decoded: { id: string } = jwtDecode(payload.token);

        return {
          id: decoded.id,
          user: payload.user,
          token: payload.token,
        };
      },
    })
  ],

  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
        token.userId = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },

  //   callbacks: {
  //     async jwt({ token, user }) {
  // if(user){
  //         token.user = user.user
  //       token.token = user.token 
  //       token.userId = user.id;
  // }
  //       // token.id = user.id

  //       return token // encrypted object 
  //     },
  //     async session ({ session , token}){
  //       session.user = token.user
  //       // session.user.id = token.userId as string;
  //       // session.token = token.token
  //     //    session.user = {
  //     //   ...session.user,
  //     //   ...token.user,
  //     //   id: token.userId as string,
  //     // };
  //   //   if (session.user) {
  //   //   session.user.id = token.userId as string;
  //   // }
  //       return session
  //     },
  //   },

  secret: process.env.AUTH_SECRET,
} 