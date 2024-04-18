import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@swayamduhan/medium-clone";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>()
// you dont need to process.env to get your envs, it is all present in Context variable i.e 'c' and you need to specify here above

// avoid initialising too many global variables in a serverless application because they might bring up a single route 
// and you will lose the global context when that happens

async function digestMessage(message : string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
}

userRouter.post('/signup', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();  // conventionally you should await json creation reqs because they are delegated to another thread to handle
    const { success } = await signupInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.text("Incorrect Inputs!")
    }
    const secret = c.env.JWT_SECRET
    try{
        const password = await digestMessage(body.password)
        const userExists = await prisma.user.findFirst({
            where : {
                email : body.email
            }
        })
        if(userExists){
            c.status(411)
            return c.text("User already exists, Sign in instead!")
        }
        const user = await prisma.user.create({
            data : {
                email : body.email,
                password : password,
                name : body.name
            }
        })
        const token = await sign({id : user.id}, secret)
        return c.json({token})
    } catch(e) {
        console.log(e)
        c.text("invalid shit happened")
        return c.status(403)
    }
})

userRouter.post('/signin', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = await signinInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.text("Incorrect inputs in body")
    }
    const secret = c.env.JWT_SECRET
    const hashedPass = await digestMessage(body.password)

    const foundUser = await prisma.user.findUnique({
        where : {
            email : body.email
        }
    })

    if(!foundUser) {
        c.status(404)
        return c.text("couldn't find account")
    }

    if(foundUser.password !== hashedPass){
        return c.text("wrong password")
    }

    const token = await sign({id : foundUser.id}, secret)
    return c.json({token})
})