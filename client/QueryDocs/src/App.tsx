import { useState } from 'react'
import Upload from './pages/upload'
import Chat from './pages/chat'
import './App.css'

function App() {

  return (
     <div className="min-h-screen bg-black p-6">
      <h1 className="text-white text-2xl font-bold mb-6 text-center">
        AI PDF Chatbot
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <Upload />
        <Chat />
      </div>
    </div>
  )
}

export default App
