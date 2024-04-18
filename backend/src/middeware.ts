import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function authMiddleware(c : Context, next : Next){
    const auth = c.req.header("Authorization");
    if(!auth){
        c.status(403) // standard code for unauthorized
        return c.json({error : "unauthorized"})
    }
    const jwt = auth.split(' ')[1];
    const decoded = await verify(jwt, c.env.JWT_SECRET)
    if(!decoded){
        c.status(403)
        return c.json({error : "unauthorized"})
    }
    
    c.set('userId', decoded.id)
    await next()
}