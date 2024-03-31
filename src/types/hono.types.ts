import { Env,Context } from "hono";
import { BlankInput } from "hono/types";

export type HContext =  Context<Env, "/signup", BlankInput>