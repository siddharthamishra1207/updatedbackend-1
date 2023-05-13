import React, { useState, useEffect } from "react";
import "../login/Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [pwd, setPassword] = useState("");
  const [email,setEmail]=useState("");
  const [error, setError] = useState(null);
  const [isSignedIn, setSignedIn] = useState(false)
  const [credential, setCredential] = useState(null);

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/auth/register", {
        username:username,
        email:email,
        pwd:pwd
      });
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isSignedIn ? (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder="johndoe"
              onChange={(e) => setUsername(e.target.value)}
            />
             <label htmlFor="">Email</label>
            <input
              name="email"
              type="text"
              placeholder="xyz@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign up</button>
            {error && error}
          </form>
        </div>) : <></>}
    </>
  );
}

export default Signup;
