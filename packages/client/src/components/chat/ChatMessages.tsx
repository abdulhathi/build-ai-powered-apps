import classNames from 'classnames'
import React from 'react'
import ReactMarkDown from 'react-markdown'

export type ChatMessage = {
  content: string
  contentType: 'user' | 'bot'
}

type ChatMessagesProps = {
  messages: ChatMessage[]
  lastMessageRef: React.Ref<HTMLDivElement>
}

const ChatMessages = ({ messages, lastMessageRef }: ChatMessagesProps) => {
  const onCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()?.toString().trim()
    if (selection) {
      e.preventDefault()
      e.clipboardData.setData('text/plain', selection)
    }
  }
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={classNames(
            {
              'self-start bg-gray-100': message.contentType === 'bot',
              'self-end bg-blue-600 text-white': message.contentType === 'user',
            },
            'px-3 py-1 rounded-2xl'
          )}
          onCopy={onCopy}
          ref={lastMessageRef}
        >
          <ReactMarkDown>{message.content}</ReactMarkDown>
        </div>
      ))}
    </>
  )
}

export default ChatMessages
