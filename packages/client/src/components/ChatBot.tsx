import { FaArrowUp } from 'react-icons/fa'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import ReactMarkDown from 'react-markdown'

type ChatFormData = {
  prompt: string
}

type ChatResponse = {
  message: string
}

type ChatMessage = {
  content: string
  contentType: 'user' | 'bot'
}

const ChatBot = () => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>()

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const uuid = useRef(crypto.randomUUID())
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setErrorMessage('')
      setIsBotTyping(true)
      reset()
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
    }
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }
  const onCopy = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    const selectedContent = window.getSelection()?.toString().trim()
    if (selectedContent) {
      e.preventDefault()
      e.clipboardData.setData('text/plain', selectedContent)
    }
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-3 items-end py-10 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={classNames(
              {
                'self-start bg-gray-100': message.contentType === 'bot',
                'bg-blue-600 text-white': message.contentType === 'user',
              },
              'px-3 py-1 rounded-2xl'
            )}
            onCopy={onCopy}
          >
            <ReactMarkDown>{message.content}</ReactMarkDown>
          </div>
        ))}
        {isBotTyping && (
          <div className="self-start flex gap-1">
            <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse [animation-delay: 0.2s]"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse [animation-delay: 0.4s]"></div>
          </div>
        )}
        {errorMessage && (
          <div className="self-start text-red-600">{errorMessage}</div>
        )}
      </div>
      <form
        className="flex flex-col items-end border-2 gap-2 rounded-2xl p-2"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        ref={formRef}
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (data) => data.trim().length > 0,
          })}
          className="border-0 focus:outline-none w-full resize-none"
          placeholder="Ask anything ?"
          autoFocus
        />
        <Button className="rounded-full w-9 h-9" disabled={!formState.isValid}>
          <FaArrowUp />
        </Button>
      </form>
    </div>
  )
}

export default ChatBot
