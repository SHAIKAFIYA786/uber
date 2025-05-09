 import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainContext } from "../context/CaptainContext"; // ✅ Adjust path if needed

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {captain,setCaptainData} = useContext(CaptainContext); // ✅ Correct way to access context
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        data
      );

      if (response.status === 200) {
        const data = response.data;
        // console.log(data.captain,"hey afiya");
        // console.log(data.captain)
        // console.log("Login successful:", data);
        setCaptainData(data.captain)

        // Save token/data to localStorage
        localStorage.setItem("token", JSON.stringify(data));

        // Redirect to home
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col px-4 justify-between h-screen w-full">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
          className="h-8 my-4"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-medium">Enter Captain's Email</h3>
          <input
            placeholder="example@mail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="px-4 py-2 bg-[#eeeeee] w-full text-xl placeholder:text-sm my-2"
          />

          <h3 className="text-xl font-medium">Enter Your Password</h3>
          <input
            placeholder="********"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 bg-[#eeeeee] w-full text-lg placeholder:text-base my-2"
          />

          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded w-full mt-4 my-2 flex items-center justify-center"
          >
            Login
          </button>

          <p className="text-align-center">
            Don't have an account?{" "}
            <Link className="text-blue-600" to="/captainsignup">
              Register
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/login"
          className="bg-black text-white py-2 px-4 rounded mt-4 my-2 flex items-center justify-center"
        >
          Login As User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;

