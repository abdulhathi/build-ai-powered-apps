import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return <b className="font-bold p-5 text-3xl">{message}</b>
}

export default App
