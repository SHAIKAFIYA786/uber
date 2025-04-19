import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignUp'
import CaptainHome from './pages/CaptainHome'
import Home2 from './pages/Home2'
import { useContext } from 'react';
import { UserContextData } from './context/userContext';
import UserProtectWrapper from './pages/userProtectWrapper';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import UserLogout from './pages/UserLogout';
// import CaptainContext from './context/CaptainContext';
import New from './pages/New'

const App = () => {
  const {userData} = useContext(UserContextData);
  console.log("User data in App.jsx:", userData);
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/captainlogin" element={<CaptainLogin/>}/>
        <Route path="/captainsignup" element={<CaptainSignup/>}/>
        <Route path="/home2" element={<UserProtectWrapper>
          <Home2/>
        </UserProtectWrapper>}/>
        <Route path="/logout" element={<UserLogout/>}/>
        <Route path="/captain-home" element={<CaptainProtectWrapper>
          <CaptainHome/>
        </CaptainProtectWrapper>}/>
        <Route path="/new" element={<New/>}/>
      </Routes>
    </div>
  )
}

export default App