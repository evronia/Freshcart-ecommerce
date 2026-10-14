import * as zod from "zod"


export const registerScema = zod.object({
    name: zod.string().nonempty("Name is required").min(3, "Name must be at least 3 characters long").max(30, "Name must be less than 30 characters"),
    email: zod.email("Invalid email format"),
    password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
    rePassword: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
    phone: zod.string().regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number")
}).refine((data) => data.password === data.rePassword, {
    error: "Passwords do not match",
    path: ["rePassword"],
})

export  type RegisterSchemaType = zod.infer<typeof registerScema>

