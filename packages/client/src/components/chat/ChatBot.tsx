import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import TypingIndicator from './TypingIndicator'
import type { ChatMessage } from './ChatMessages'
import ChatMessages from './ChatMessages'
import ChatInput, { type ChatFormData } from './ChatInput'
import pop from '../../assets/sounds/pop.mp3'
import notification from '../../assets/sounds/notification.mp3'

type ChatResponse = {
  message: string
}

const ChatBot = () => {
  const popAudio = new Audio(pop)
  popAudio.volume = 0.2
  const notificationAudio = new Audio(notification)
  notificationAudio.volume = 0.2

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const uuid = useRef(crypto.randomUUID())
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleChatMessages = async ({ prompt }: ChatFormData) => {
    try {
      popAudio.play()
      setErrorMessage('')
      setIsBotTyping(true)
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: prompt, contentType: 'user' },
      ])
      const { data } = await axios.post<ChatResponse>('/api/chat', {
        prompt: prompt,
        conversationId: uuid.current,
      })
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: data.message, contentType: 'bot' },
      ])
    } catch (error) {
      console.error(error)
      setErrorMessage('Something went wrong!')
    } finally {
      setIsBotTyping(false)
      notificationAudio.play()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full gap-3 items-end overflow-y-auto">
        <ChatMessages messages={messages} lastMessageRef={lastMessageRef} />
        {isBotTyping && <TypingIndicator />}
        {errorMessage && (
          <div className="self-start text-red-600">{errorMessage}</div>
        )}
      </div>
      <ChatInput handleChatMessages={handleChatMessages} />
    </div>
  )
}

export default ChatBot
