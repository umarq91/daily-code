import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { blogRouter } from './routes/blog';
import { userRouter } from './routes/auth';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  },Variables:{
    userId:string
  }
}>()


app.route('/api/v1/blog',blogRouter)
app.route('/api/v1/user',userRouter)



export default app
