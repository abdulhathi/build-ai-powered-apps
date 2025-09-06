import React from 'react'
import { Button } from '../ui/button'
import { FaArrowUp } from 'react-icons/fa'
import { useForm } from 'react-hook-form'

export type ChatFormData = {
  prompt: string
}

type ChatInputProps = {
  handleChatMessages: (data: ChatFormData) => void
}

const ChatInput = ({ handleChatMessages }: ChatInputProps) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>()
  const handleChatInputSubmit = handleSubmit((data) => {
    reset({ prompt: '' })
    handleChatMessages(data)
  })
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChatInputSubmit()
    }
  }

  return (
    <form
      className="flex flex-col items-end border-2 gap-2 rounded-2xl p-2"
      onSubmit={handleChatInputSubmit}
      onKeyDown={handleKeyDown}
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
  )
}

export default ChatInput
