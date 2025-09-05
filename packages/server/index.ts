import express from 'express'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAPI_API_KEY,
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

// console.log(process.env.OPENAI_API_KEY)
app.get('/', (req: Request, res: Response) => {
  res.send('Hi Hello')
})

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hi Hello' })
})

const conversations = new Map<string, string>()

app.post('/api/chat', async (req: Request, res: Response) => {
  const { prompt, convId } = req.body

  const response = await openAIClient.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt,
    temperature: 1,
    previous_response_id: conversations.get(convId),
    max_output_tokens: 100,
  })
  conversations.set(convId, response.id)
  res.json({ message: response.output_text })
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})
