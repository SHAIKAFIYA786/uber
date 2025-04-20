import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userContext';
import CaptainProvider from './context/CaptainContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext>
        <CaptainProvider>
          <App />
        </CaptainProvider>
      </UserContext>
    </BrowserRouter>
  </StrictMode>,
)
