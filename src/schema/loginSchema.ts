import * as zod from "zod"


export const loginSchema = zod.object({
    email: zod.email("Invalid email format"),
    password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
  
})

export  type loginSchemaType = zod.infer<typeof loginSchema>

