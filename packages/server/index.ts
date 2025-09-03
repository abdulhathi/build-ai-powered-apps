import express from 'express'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

// console.log(process.env.OPENAI_API_KEY)
app.get('/', (req: Request, res: Response) => {
  res.send('Hi Hello')
})

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hi Hello' })
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})
