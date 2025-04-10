import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CaptainLogin = () => {
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [captainData,setCaptainData]=useState({});
   const submitHandler=(e)=>{
    //dont referesh the form 
    e.preventDefault();
    setCaptainData({
      email:email,
      password:password
    });
    console.log(captainData)
    // by the above thing we can be able to send the data to the other pages as well
    // console.log("hello");
    setEmail("");
    setPassword("");
   }
  // we must use height to provide the flex prpopertied 
  return (
    <div className="flex flex-col px-4 justify-between h-screen">
      <div> 
      <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
          className="h-8 my-4"
        />
        <form onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <h3 className="text-xl font-medium"> Enter Captains Email</h3>
          <input
            placeholder="Example@mail.com"
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            //   console.log(email)
            }}
            type="email"
            className="px-4 py-2 bg-[#eeeeee] w-full text-xl placeholder:text-sm my-2"
          />
          <h3 className="text-xl font-medium"> Enter Captains Your Password</h3>
          <input placeholder="*********" 
          required type="password" 
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
            // console.log(password);
          }}
          className="px-4 py-2 bg-[#eeeeee] w-full text-lg placeholder:text-base my-2" />
          <br />
          <button type="submit" className="bg-[black] text-white py-2 px-4 rounded w-full mt-4 my-2">
            Login
          </button>
          <p className="text-align-center">
            Don't have an account? <Link className='text-blue-600' to='/captainsignup'>Register</Link>
          </p>
        </form>
      </div>
      <div>
      <Link to='/login' type="submit" className="bg-[black] text-white py-2 px-4 rounded  mt-4 my-2 flex items-center justify-center">
             Login As User
          </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
