import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'
import '@/fonts/din-round.woff2'
import '@/fonts/din-round2.woff2'
import { QuestionsProvider } from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QuestionsProvider>
      <App />
    </QuestionsProvider>
  </React.StrictMode>
)
