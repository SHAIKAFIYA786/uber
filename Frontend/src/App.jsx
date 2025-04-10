import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/captainSignUp'
import { useContext } from 'react';
import { UserContextData } from './context/userContext';



const App = () => {
  const [userData] = useContext(UserContextData);

  console.log("User data in App.jsx:", userData);
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/captainlogin" element={<CaptainLogin/>}/>
        <Route path="/captainsignup" element={<CaptainSignup/>}/>
      </Routes>
    </div>
  )
}

export default App