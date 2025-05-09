// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import UserContext from './context/UserContext';
// import CaptainProvider from './context/CaptainContext';
// import CaptainDetails from './components/CaptainDetails.jsx';
// import SocketProvider from './context/SocketContext.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <SocketProvider>
//     <BrowserRouter>
//       <UserContext>
//         <CaptainProvider>
//           <App />
//         </CaptainProvider>
//       </UserContext>
//     </BrowserRouter>
//     </SocketProvider>
    
//   </StrictMode>,
// )
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UserContext from './context/UserContext'; // ✅ this is your provider
import CaptainProvider from './context/CaptainContext';
import SocketProvider from './context/SocketContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <UserContext> {/* ✅ wrapping here */}
          <CaptainProvider>
            <App />
          </CaptainProvider>
        </UserContext>
      </BrowserRouter>
    </SocketProvider>
  </StrictMode>
);
