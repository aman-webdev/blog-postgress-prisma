import { Hono } from "hono"
import user from "./user.routes"
import blog from "./blog.routes"
const route = new Hono()

route.route("/user",user)
route.route("/blog",blog)


export default route