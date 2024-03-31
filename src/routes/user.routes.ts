import {Hono} from "hono"
import { signin, signup } from "../controllers/user.controller"

const user = new Hono()

user.post("/signup",signup)
user.post("/signin",signin)


export default user