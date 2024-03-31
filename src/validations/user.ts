import {z} from "zod"


export const validateSignUpSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(5)
})

export const validateSignInSchema = z.object({
    email:z.string().email(),
    password:z.string().min(5)
})

export type TypeSignup = z.infer<typeof validateSignUpSchema>
export type TypeSignIn = z.infer<typeof validateSignInSchema>
