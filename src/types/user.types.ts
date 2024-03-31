import {User} from "@prisma/client"

export type SignUpType = Pick<User,"email" | "name" | "password">

