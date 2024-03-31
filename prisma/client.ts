import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'


const getClient = (dbURL:string) => {
    console.log(dbURL)
     const prisma = new PrismaClient({
        datasourceUrl: dbURL,
    }).$extends(withAccelerate())
    return prisma
}

export default getClient