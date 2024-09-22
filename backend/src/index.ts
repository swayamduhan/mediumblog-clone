import { Hono } from 'hono'
import { userRouter } from './routes/userRoutes'
import { blogRouter } from './routes/blogRoutes'
import { cors } from 'hono/cors'



const app = new Hono()
app.use('/*', cors())

app.get('/', (c) => {
  return c.json({
    workingRoutes : {
      1 : "POST : api/v1/user/signin",
      2 : "POST : api/v1/user/signup",
      3 : "GET  : api/v1/blog/:id",
      4 : "GET  : api/v1/blog/bulk",
      6 : "POST : api/v1/blog/",
      7 : "PUT  : api/v1/blog/",
    }
  })
})

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
