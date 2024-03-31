import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

const response  = (context:Context,message:string,status:StatusCode,data?:any,) => {
    if(status) context.status(status)
    return context.json({message,data})
}

export default response