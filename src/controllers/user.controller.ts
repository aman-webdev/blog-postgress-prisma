import { Context } from "hono";
import { env } from 'hono/adapter'
import { SignUpType } from "../types/user.types";
import { TypeSignIn, validateSignUpSchema } from "../validations/user";
import getClient from "../../prisma/client";
import response from "../utils/response";
import { decode, sign, verify } from 'hono/jwt'
import { generateSalt, hashPassword } from "../utils/hash";


export const signup = async(c:Context) =>{

     try{
        const {DATABASE_URL,JWT_SECRET} = env<{DATABASE_URL:string,JWT_SECRET:string}>(c)
        const body : SignUpType = await c.req.json()
        console.log(body)
        if(!validateSignUpSchema.safeParse({...body}).success) {
           c.status(401)
           return c.json({message:"Invalid params"})
        }

        const client = getClient(DATABASE_URL)

        const salt = generateSalt(12)
        const hashedPass = await hashPassword(body.password, salt)
       
        const {id} = await client.user.create({
            data: {
                ...body , password: hashedPass, salt 
            },
            select : {
                id:true
            }
        })

        const token  = await sign({
            id
        },JWT_SECRET)

        return response(c,"Signup Success",201,{id,token})
     }catch(err) {
        console.log(err)
        return response(c,"Something went wrong",500)
     }
 
}

export const signin = async(c:Context) => {
    
    try{
        const {DATABASE_URL,JWT_SECRET} = env<{DATABASE_URL:string,JWT_SECRET:string}>(c)
        const body : TypeSignIn = await c.req.json()
        if(!validateSignUpSchema.safeParse({...body}).success) {
           c.status(401)
           return c.json({message:"Invalid params"})
        }

        const client = getClient(DATABASE_URL)
        
        const user = await client.user.findFirst({
            where:{
               email:body.email
            },
            select : {
                id:true ,
                password: true,
                salt:true
            }
        })

        if(!user) return response(c,"Invalid Username / Password", 404)

        const hashedPass =await hashPassword(body.password,user.salt)
        if(hashedPass !== user.password) return response(c,"Invalid Username / Password", 404)

        const token  = await sign({
            id: user.id
        },JWT_SECRET)

        return response(c,"Signin Success",201,{token})
     }catch(err) {
        return response(c,"Something went wrong",500)
     }
}