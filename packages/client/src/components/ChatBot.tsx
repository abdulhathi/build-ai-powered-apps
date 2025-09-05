import { FaArrowUp } from 'react-icons/fa'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRef, useState } from 'react'

type ChatFormData = {
  prompt: string
}

type ChatMessage = {
  message: string
}

const ChatBot = () => {
  const [messages, setMessages] = useState<string[]>([])
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>()
  const uuid = useRef(crypto.randomUUID())

  const onSubmit = async ({ prompt }: ChatFormData) => {
    reset()
    setMessages((prevMessages) => [...prevMessages, prompt])
    const { data } = await axios.post<ChatMessage>('/api/chat', {
      prompt: prompt,
      conversationId: uuid.current,
    })
    setMessages((prevMessages) => [...prevMessages, data.message])
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }
  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form
        className="flex flex-col items-end border-2 gap-2 rounded-2xl p-2"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (data) => data.trim().length > 0,
          })}
          className="border-0 focus:outline-none w-full resize-none"
          placeholder="Ask anything ?"
        />
        <Button className="rounded-full w-9 h-9" disabled={!formState.isValid}>
          <FaArrowUp />
        </Button>
      </form>
    </div>
  )
}

export default ChatBot
