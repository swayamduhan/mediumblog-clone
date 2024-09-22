import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { authMiddleware } from "../middeware";
import { updatePostInput, createPostInput } from "@swayamduhan/medium-clone";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userId : string
    }
}>()

blogRouter.use(authMiddleware)

blogRouter.post('/', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const { success } = await createPostInput.safeParse(body)
    if(!success) {
        c.status(411)
        return c.text("incorrect inputs")
    }
    try {
        const createdPost = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : c.get('userId'),
                published : true
            }
        })

        return c.json(createdPost)
    } catch(e) {
        console.log(e)
        c.status(411)
        return c.text("something went wrong")
    }
})

blogRouter.put('/', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const { success } = await updatePostInput.safeParse(body)
    if(!success) {
        c.status(411)
        return c.text("incorrect inputs")
    }
    try {
        await prisma.post.update({
            where : {
                id : body.id,
                authorId : c.get('userId')
            },
            data : {
                title : body.title,
                content : body.content
            }
        })

        c.status(200)
        return c.text("updated!")
    } catch(e) {
        console.log(e)
        return c.status(411)
    }
})

blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const posts = await prisma.post.findMany({
            select : {
                id : true,
                title : true,
                content : true,
                publishedDate : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return c.json(posts)
    } catch(e) {
        console.log(e)
        return c.status(411)
    }
})

blogRouter.get("/:id", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id")
    try {
        const blog = await prisma.post.findFirst({
            where : {
                id
            },
            select : {
                id : true,
                title : true,
                content : true,
                publishedDate : true,
                author : {
                    select : {
                        name : true,
                    }
                }
            }
        })
        return c.json(blog)
    } catch(e) {
        console.log(e)
        return c.status(411)
    }
})

