import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContextData } from "../context/userContext";
import {CaptainContext} from "../context/CaptainContext";
// import { UserContextData } from "../context/userContext";
// import CaptainContext from '../context/CaptainContext.jsx';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from "react";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [typeVehicle, setTypeVehicle] = useState("");
  const navigate = useNavigate(); //before using navigate use this
  // const [captain, setCaptain] = useContext(CaptainContextData);
  const {captainData, setCaptainData} =useContext(CaptainContext);
  const submitHandler =async (e) => {
    //dont referesh the form
    e.preventDefault();
    const data={
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: plateNumber,
        capacity: vehicleCapacity,
        typevehicle: typeVehicle
      }
    };
    console.log(data);
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, data);
    if (response.status == 201) {
      const data = response.data;
      setCaptainData(data);
      localStorage.setItem("token", JSON.stringify(data));
      console.log("Navigating to /", data);
      navigate("/");
    }
    // by the above thing we can be able to send the data to the other pages as well
    // console.log("hello");
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setPlateNumber("");
    setVehicleCapacity("");
    setTypeVehicle("");
  };


  return (
    <div className="flex flex-col px-4 justify-between h-screen">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
          className="h-8 my-4"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-xl font-medium">Enter Your Full Name</h3>
          <div className=" flex gap-2">
            <input
              placeholder="First Name"
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                //   console.log(email)
              }}
              type="text"
              className="px-4 py-2 bg-[#eeeeee] w-1/2 text-xl placeholder:text-sm my-2"
            />
            <input
              placeholder="Last Name"
              required
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
                //   console.log(email)
              }}
              type="text"
              className="px-4 py-2 bg-[#eeeeee] w-1/2 text-xl placeholder:text-sm my-2"
            />
          </div>
          <h3 className="text-xl font-medium"> Enter Captains Email</h3>
          <input
            placeholder="Example@mail.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              //   console.log(email) 
            }}
            type="email"
            className="px-4 py-2 bg-[#eeeeee] w-full text-xl placeholder:text-sm my-2"
          />
          <h3 className="text-xl font-medium"> Enter Captains Your Password</h3>
          <input
            placeholder="*********"
            required
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="px-4 py-2 bg-[#eeeeee] w-full text-lg placeholder:text-base my-2"
          />
          <br />
          <h3 className="text-xl font-medium">Enter Your vehicle details</h3>
          <div className=" flex gap-2">
            <input
              placeholder="color"
              required
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              type="text"
              className="px-4 py-2 bg-[#eeeeee] w-1/2 text-xl placeholder:text-sm my-2"
            />
            <input
              placeholder="plate number"
              required
              value={plateNumber}
              onChange={(e) => {
                setPlateNumber(e.target.value);
              }}
              type="text"
              className="px-4 py-2 bg-[#eeeeee] w-1/2 text-xl placeholder:text-sm my-2"
            />
          </div>
          <div className=" flex gap-2">
            <input
              placeholder="capacity"
              required
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
                //   console.log(email)
              }}
              type="Number"
              className="px-4 py-2 bg-[#eeeeee] w-1/2 text-xl placeholder:text-sm my-2"
            />
            <input
              placeholder="type of vehicle"
              required
              value={typeVehicle}
              onChange={(e) => {
                setTypeVehicle(e.target.value);
                //   console.log(email)
              }}
              type="text"
              className="px-4 py-2 bg-[#eeeeee] w-1/2 text-xl placeholder:text-sm my-2"
            />
          </div>
          <button
            type="submit"
            className="bg-[black] text-white py-2 px-4 rounded w-full mt-4 my-2"
          >
            Register
          </button>
          <p className="text-center">
            ALready have an account?{" "}
            <Link className="text-blue-600" to="/captainlogin">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          type="submit"
          className="bg-[black] text-white py-2 px-4 rounded  mt-4 my-2 flex items-center justify-center"
        >
          Login As User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
