import express from 'express'
import dotenv from 'dotenv'
// import cors from 'cors'

import router from './routes'

dotenv.config()

const app = express()
// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// )
app.use(express.json())
app.use(router)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})
