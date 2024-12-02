import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup', (c) => {
  return c.text ("Hello hono")
})
app.post('/api/v1/signin', (c) => {
  return c.text ("Hello hono")
})

app.post('/api/v1/blog', (c) => {
  return c.text ("Hello hono")
})

app.put('/api/v1/blog', (c) => {
  return c.text ("Hello hono")
})

app.get('/api/v1/blog/:id ', (c) => {
  return c.text ("Hello hono")
})

export default app
