// // import React from 'react'
// // import { useContext } from 'react';
// // import { UserContextData } from "../context/userContext";
// // import { useNavigate } from 'react-router-dom';

// // const UserProtectWrapper=({
// //     children
// // })=>{
// //     const navigate=useNavigate();
// //     const token=localStorage.getItem("token")
// //     const [userData,setUserData]=useContext(UserContextData);
// //     if(!token){
// //         navigate('/login')
// //     }
// //   return (
// //     <>
// //     {children}
// //     </>
// //   )
// // }

// // export default UserProtectWrapper
// import React, { useEffect } from 'react'
// import { useContext } from 'react';
// import { UserContextData } from "../context/userContext";
// import { useNavigate } from 'react-router-dom';

// const UserProtectWrapper = ({ children }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   // const [userData, setUserData] = useContext(UserContextData);

//   useEffect(() => {
//     if (!token) {
//       navigate('/login'); // ✅ safely navigating inside useEffect
//     }
//   }, [token, navigate]); // Add token and navigate as dependencies

//   return <>{children}</>;
// };

// export default UserProtectWrapper;
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;