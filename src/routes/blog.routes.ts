import { Hono } from "hono";
import { createBlog, getBlog, getBlogsBulk, updateBlog } from "../controllers/blog.controller";
import { Context, Next } from "hono";
import { env } from "hono/adapter";
import {verify} from "hono/jwt"
import response from "../utils/response";

const blog = new Hono<{
    Variables: {
        userId:string
    },
    Bindings : {
        JWT_SECRET:string,
        DATABASE_URL:string
    }
}>()


blog.use(async(c:Context,next:Next) => {
    const {JWT_SECRET} = env<{JWT_SECRET:string}>(c)
    const bearer = c.req.header("Authorization")
    if(!bearer) return response(c,"Not Authorized",401)
    const token = bearer.split("Bearer ").pop()
    if(!token) return response(c,"Not Authorized",401)

    const {id} = await verify(token,JWT_SECRET)
    c.set("userIdd",id)
    await next()
}
)
blog.post("/",createBlog).put(updateBlog)
blog.get("/bulk",getBlogsBulk)
blog.get("/:blogId",getBlog)

export default blog