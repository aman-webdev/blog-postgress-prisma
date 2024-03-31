import { Hono } from 'hono'
import routes from "./routes"
const app = new Hono()


app.route('/api/v1',routes)

app.get('/', async(c) => {
  
  return c.text("g")
})





export default app
