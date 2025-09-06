import OpenAI from 'openai'
import { conversationRepository } from '../repositaries/conversation.repositary'
import meeshTheDemon from '../prompt/meeshTheBadDemon.txt'
import wonderWorldPark from '../prompt/wonderWorld.txt'
import fs from 'fs'
import path from 'path'

const parkInfo = fs.readFileSync(
  path.join(__dirname, '..', 'prompt', 'WonderWorld.md'),
  'utf-8'
)
const wonderWorldInstruction = wonderWorldPark.replace('{{parkInfo}}', parkInfo)

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type ChatResponse = {
  id: string
  message: string
}

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const response = await openAIClient.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      instructions: wonderWorldInstruction,
      temperature: 1,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
      max_output_tokens: 200,
    })
    conversationRepository.setLastResponseId(conversationId, response.id)
    return { id: response.id, message: response.output_text }
  },
}
