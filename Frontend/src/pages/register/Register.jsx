import React, { useState } from "react";
import upload from "../../utils/upload";
import "./register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Register() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [desc,setDesc]=useState('');
  const [country,setCountry]=useState('');
  const [isSeller,setSeller]=useState(false);
  const [phone,setPhone]=useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    setUsername(currentUser.username)
    console.log(username)
  }, [])

  

  const handleSeller = (e) => {
    setSeller(true)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      await newRequest.post("/auth/update", {
        desc:desc,
        isSeller:isSeller,
        country:country,
        phone:phone,
        img:url,
        username:username
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>

          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="India"
            value={country}
            onChange={(e)=>{setCountry(e.target.value)}}
          />
          <div className="toggle">
            <label htmlFor="">Activate the creator account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <button type="submit">Update</button>
        </div>
        <div className="right">
          <h1>I want to become a creator</h1>

          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            value={desc}
            onChange={(e)=>{setDesc(e.target.desc)}}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
