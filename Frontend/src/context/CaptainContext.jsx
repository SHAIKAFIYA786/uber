import React, { createContext, useState } from "react";

// ✅ Correct context export
export const CaptainContext = createContext();

const CaptainProvider = ({ children }) => {
  const [captain,setCaptainData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "", 
      plate: "",
      capacity: "",
      typevehicle: "",
    },
  });

  return (
    <CaptainContext.Provider value={{captain,setCaptainData}}>
      {children}
    </CaptainContext.Provider>
  );
};

export default CaptainProvider; // ✅ This is the Provider component
