"use server"

import { loginSchemaType } from "@/schema/loginSchema";
import { cookies } from "next/headers";




export async function loginUserAPI(values:loginSchemaType){


const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
})

const result = await res.json();

if (!res.ok) {
    throw new Error(result.message || "Login failed");


} 





return result.user.name;



}