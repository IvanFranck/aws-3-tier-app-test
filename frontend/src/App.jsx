import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axiosInstance from './lib/axios'

function App() {
  const [serverResponse, setServerResponse] = useState("")

  async function handleServerCall() {
    axiosInstance.get('').then(resp => {
      if (resp && resp.data) {
        setServerResponse(resp.data)
      }
    })
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
