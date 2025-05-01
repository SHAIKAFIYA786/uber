import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userContext';
import CaptainProvider from './context/CaptainContext';
import CaptainDetails from './components/CaptainDetails.jsx';
import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
    <BrowserRouter>
      <UserContext>
        <CaptainProvider>
          <App />
        </CaptainProvider>
      </UserContext>
    </BrowserRouter>
    </SocketProvider>
    
  </StrictMode>,
)
