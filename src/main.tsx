import React from 'react'
import ReactDOM from 'react-dom/client'
import TextToSpeech from './components/TextToSpeechComponent'
import "./css/Page.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <TextToSpeech/>
  </React.StrictMode>,
)
