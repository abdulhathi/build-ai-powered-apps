import { LLMClient } from '../client/llmclient'
import { conversationRepository } from '../repositories/conversation.repository'
import meeshTheDemon from '../prompt/meeshTheBadDemon.txt'
import wonderWorldPark from '../prompt/wonderWorld.txt'
import fs from 'fs'
import path from 'path'

const parkInfo = fs.readFileSync(
  path.join(__dirname, '..', 'prompt', 'WonderWorld.md'),
  'utf-8'
)
const wonderWorldInstruction = wonderWorldPark.replace('{{parkInfo}}', parkInfo)

type ChatResponse = {
  id: string
  message: string
}

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const response = await LLMClient.generateLLMResponse({
      prompt,
      instructions: wonderWorldInstruction,
      previousResponseId:
        conversationRepository.getLastResponseId(conversationId),
    })
    conversationRepository.setLastResponseId(conversationId, response.id)
    return { id: response.id, message: response.message }
  },
}
