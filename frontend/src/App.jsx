import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const [serverResponse, setServerResponse] = useState("")
  const [apiUrl, setApiUrl] = useState("")

  async function handleServerCall() {
    const axiosInstance = axios.create({
      timeout: 30000,
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain',
      },
    })

    axiosInstance.get('').then(resp => {
      if (resp && resp.data) {
        setServerResponse(resp.data)
      }
    })
  }

  function handleInpuApiUrl(e) {
    setApiUrl(e.target.value)
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type='text' value={apiUrl} onInput={handleInpuApiUrl} placeholder='TYpe the server URL' />
        <button onClick={handleServerCall}>
          Contact the server
        </button>
        <p>
          {serverResponse && serverResponse.length > 0 && serverResponse}
        </p>
      </div>

    </>
  )
}

export default App
