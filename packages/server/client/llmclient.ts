import OpenAI from 'openai'
import ollama from 'ollama'

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type LLMOptions = {
  model?: string
  prompt: string
  instructions?: string
  temperature?: number
  previousResponseId?: string
  maxTokens?: number
}

export type LLMResponse = {
  id: string
  message: string
}

export const LLMClient = {
  async generateLLMResponse({
    model = 'gpt-4.1-mini',
    prompt,
    instructions,
    temperature = 1,
    previousResponseId,
    maxTokens = 1000,
  }: LLMOptions): Promise<LLMResponse> {
    const response = await openAIClient.responses.create({
      model,
      input: prompt,
      instructions,
      temperature,
      previous_response_id: previousResponseId,
      max_output_tokens: maxTokens,
    })

    return { id: response.id, message: response.output_text }
  },

  async generateOllamaText(prompt: string): Promise<string> {
    const response = await ollama.chat({
      model: 'llama3.1',
      messages: [{ role: 'user', content: prompt }],
    })
    console.log(response)
    return response.message.content
  },
}
