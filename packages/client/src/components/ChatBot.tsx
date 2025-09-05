import { FaArrowUp } from 'react-icons/fa'
import { Button } from './ui/button'

const ChatBot = () => {
  return (
    <div className="flex flex-col items-end border-2 gap-2 rounded-2xl p-2">
      <textarea
        className="border-0 focus:outline-none w-full resize-none"
        placeholder="Ask anything ?"
      />
      <Button className="rounded-full w-9 h-9">
        <FaArrowUp />
      </Button>
    </div>
  )
}

export default ChatBot
