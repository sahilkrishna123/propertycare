// Proper Login system
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/1.png";

function Contact() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [result, setResult] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (auth) {
      alert("Logged in successfully");
      navigate("/");
    }
  }, [navigate]);

  const handleemailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/users/login", {
        email,
        password,
      });

      // const { success, message, userData } = response.data;
      const status = response.data.status;
      
      console.log(status);
      if (status=="success") {
        setLoginStatus("success");

        localStorage.setItem("user", JSON.stringify(response.data));
        alert("Logged in successfully");
        navigate("/");
      } else {
        setLoginStatus("failed");
        alert("Invalid email or password");
        setemail("");
        setPassword("");
      }
      // this have message all user data
      // console.log("User data is : ", JSON.stringify(message.result[0].User_ID));
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img src={Logo} alt="Property Care" />
        </div>
        <div className="text-center mt-4 name">Property Care</div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user" />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleemailChange}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key" />
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="btn mt-3" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
