import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [serverResponse, setServerResponse] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [timeout, setReqTimeout] = useState(1500);

  async function handleServerCall() {

    await fetch(apiUrl)
      .then(response => {
        console.log(response)
        setServerResponse(response)
        return response
      })
      .catch(error => console.error(error))

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
        <input type='number' value={timeout} onInput={(e) => setReqTimeout(e.target.value)} />
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
