import { Context } from "hono"

export const createBlog = (c:Context) => {
    return c.text("createBlog")
}

export const updateBlog = (c:Context) => {
    return c.text("updateBlog")
}

export const getBlog = (c:Context) => {
return c.text("getBlog")
}

export const getBlogsBulk = (c:Context) => {
    return c.text("getBlogsBulk")
    }