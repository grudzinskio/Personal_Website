import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Detect Chrome browser and add class to root element (exclude Edge which also contains "Chrome")
const isChrome = /Chrome/.test(navigator.userAgent) && 
                 /Google Inc/.test(navigator.vendor) && 
                 !/Edg/.test(navigator.userAgent);
if (isChrome) {
  document.documentElement.classList.add('chrome');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
