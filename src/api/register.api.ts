"use server"

import { RegisterSchemaType } from "@/schema/registerSchema";




export async function registerUserAPI(values:RegisterSchemaType){


const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
})
console.log(res);


const result = await res.json();

if (!res.ok) {
    throw new Error(result.message || "Registration failed");

  
} 

return result.user.name;



}