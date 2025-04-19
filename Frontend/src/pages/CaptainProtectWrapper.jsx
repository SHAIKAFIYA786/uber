// import React from 'react'
// import { useContext } from 'react';
// import { UserContextData } from "../context/userContext";
// import { useNavigate } from 'react-router-dom';

// const UserProtectWrapper=({
//     children
// })=>{
//     const navigate=useNavigate();
//     const token=localStorage.getItem("token")
//     const [userData,setUserData]=useContext(UserContextData);
//     if(!token){
//         navigate('/login')
//     }
//   return (
//     <>
//     {children}
//     </>
//   )
// }

// export default UserProtectWrapper
// import React, { useEffect } from 'react'
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CaptainProtectWrapper = ({ children }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
 

//   useEffect(() => {
//     if (!token) {
//       navigate('/login'); // ✅ safely navigating inside useEffect
//     }
//   }, [token, navigate]); // Add token and navigate as dependencies

//   return <>{children}</>;
// };

// export default CaptainProtectWrapper;
import React, { useEffect, useContext } from 'react';
import { CaptainContext } from "../context/CaptainContext"; // ✅ import context
import { useNavigate } from 'react-router-dom';

const  CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { captain, setCaptainData } = useContext(CaptainContext); // ✅ access context

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default  CaptainProtectWrapper;

