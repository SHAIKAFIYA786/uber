// import React,{createContext} from 'react'
// export const UserContextData=createContext();

// const UserContext=({children})=>{
//     const user='sarthak';
//   return (
//      <div>
//          <UserContextData.Provider value={user}>
//          {children}
//          </UserContextData.Provider>
//      </div> 
//   )
// }

// export default UserContext;
// import React,{createContext} from 'react';
// import { useState } from 'react';
// export const UserContextData=createContext();

// const UserContext=({children})=>{
//     const [user, setuser] = useState({
//         email:'',
//         fullname:'',
//         lastname:''
//     })
//   return (
//      <div>
//          <UserContextData.Provider value={[user, setuser]}>
//          {children}
//          </UserContextData.Provider>
//      </div> 
//   )
// }

// export default UserContext;
import React, { createContext, useState } from 'react';

export const UserContextData = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullname: {
      firstname: '',
      lastname: ''
    },
    email: ''
  });

  return (
    <UserContextData.Provider value={{user, setUser}}>
      {children}
    </UserContextData.Provider>
  );
};

export default UserContext;
