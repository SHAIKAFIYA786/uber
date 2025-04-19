import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const UserLogin = () => {
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [userData,setUserData]=useState({}); 
   const navigate = useNavigate();//before using navigate use this
   const submitHandler=async (e)=>{
    //dont referesh the form 
    e.preventDefault();
    const data={
      email:email,
      password:password
    }
    setUserData(data)
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,data);
    if(response.status==200){
      const data=response.data;
      console.log("Navigating to /", data);
      // here we can set the user data to the context
      setUserData(data);
      localStorage.setItem("token", JSON.stringify(data));
      // and then we can navigate to the home page
      navigate("/home2");
    }
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
          <h3 className="text-xl font-medium"> Enter Your Email</h3>
          <input
            placeholder="Example@mail.com"
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
              console.log(email)
            }}
            type="email"
            className="px-4 py-2 bg-[#eeeee] w-full text-lg placeholder:text-sm my-2"
          />
          <h3 className="text-xl font-medium"> Enter Your Password</h3>
          <input placeholder="*********" 
          required type="password" 
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
            console.log(password);
          }}
          className="px-4 py-2 bg-[#eeeeee] w-full text-lg placeholder:text-base my-2" />
          <br />
          <button type="submit" className="bg-[black] text-white py-2 px-4 rounded w-full mt-4 my-2">
            Login
          </button>
          <p className="text-center">
            Don't have an account? <Link className='text-blue-600' to='/signup'>Register</Link>
          </p>
        </form>
      </div>
      <div>
      <Link to='/captainlogin'className=" flex justify-center bg-[black] text-white py-2 px-4 rounded w-full mt-4 my-2">
            Login As A Captain
          </Link>
      </div>
    </div>
  );
};

export default UserLogin;
