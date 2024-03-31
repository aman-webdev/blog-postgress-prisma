import { Context } from "hono";
import { env } from "hono/adapter";
import getClient from "../../prisma/client";
import {
  CreateBlogType,
  UpdateBlogType,
  validateCreateBlogSchema,
} from "../validations/blog";
import response from "../utils/response";

export const createBlog = async (c: Context) => {
  const { DATABASE_URL } = c.env;
  try {
    const body: CreateBlogType = await c.req.json();
    const client = getClient(DATABASE_URL);
    if (!validateCreateBlogSchema.safeParse(body).success)
      return response(c, "Invalid params", 401);
    const userId = c.get("userId");
    const result = await client.post.create({
      data: {
        ...body,
        authorId: userId,
      },
    });
    return response(c, "Created successfully", 201, result);
  } catch (err) {
    console.log(err, "in er");
    return response(c, "Something went wrong", 500);
  }
};

export const updateBlog = async (c: Context) => {
  const { DATABASE_URL } = c.env;
  try {
    const body: UpdateBlogType = await c.req.json();
    const client = getClient(DATABASE_URL);
    if (!validateCreateBlogSchema.safeParse(body).success)
      return response(c, "Invalid params", 401);
    const userId = c.get("userId");
    const result = await client.post.update({
      data: {
        ...body,
      },
      where: {
        id: body.id,
        authorId: userId,
      },
    });
    return response(c, "Updated successfully", 200, result);
  } catch (err: any) {
    console.log(err);
    const message =
      err.meta.cause === "Record to update not found."
        ? "Blog not found"
        : "something went wrong";
    return response(c, message, 500);
  }
};

export const getBlog = async (c: Context) => {
  const { DATABASE_URL } = c.env;
  try {
    const blogId = c.req.param("blogId");
    const client = getClient(DATABASE_URL);
    if (!blogId)
      return response(c, "Invalid params, blodId required", 401);
    const result = await client.post.findUnique({
      where: {
        id: blogId,
      },
    });
    return response(c, "", 200, result);
  } catch (err: any) {
    const message =
      err.meta.cause === "Record to update not found."
        ? "Blog not found"
        : "something went wrong";
    return response(c, message, 500);
  }
};

export const getBlogsBulk = async(c: Context) => {
    const { DATABASE_URL } = c.env;
    try {
      const client = getClient(DATABASE_URL);
      const userId = c.req.query("userId")
      const result = await client.post.findMany({
        where:{
            ...(userId && {
                authorId:userId
            })
        }
      });
        
      return response(c, "", 200, result);
    } catch (err: any) {
      const message =
        err?.meta?.cause === "Record to update not found."
          ? "Blog not found"
          : "something went wrong";
      return response(c, message, 500);
    }
};
