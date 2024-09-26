import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/1.png";

function Register() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [usertype, setUsertype] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (auth) {
      alert("registered successfully");
      navigate("/");
      //window.location.reload();
    }
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handlenameChange = (event) => {
    setname(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsertypeChange = (event) => {
    setUsertype(event.target.value);
  };
  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    console.log("image is", image);

    const formData = new FormData();
    formData.append("name", name);
  formData.append("password", password);
  formData.append("passwordConfirm", password); // Make sure this matches the backend requirement
  formData.append("contact", contact);
  formData.append("email", email);
  formData.append("usertype", usertype);
  formData.append("photo", image); // Photo field for image upload

    const response = await axios.post(
      "http://localhost:5000/api/v1/users/register",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("image is", image);
    console.log(response.data.message);

    const { success, message, userData } = response.data;
    localStorage.setItem("user", JSON.stringify(message));

    console.log(response.data);
    setRegistrationSuccess(true); // Set registration success state
    setname(""); // Clear input fields
    setPassword("");
    setContact("");
    setEmail("");
    setUsertype("");
  };

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="text-center mt-4 name">Property Care</div>
        <form className="p-3 mt-3" enctype="multipart/form-data">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user" />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={name}
              onChange={handlenameChange}
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

          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key" />
            <input
              type="text"
              name="usertype"
              id="pwd"
              placeholder="User Type"
              value={usertype}
              onChange={handleUsertypeChange}
            />
          </div>

          <div className="form-field d-flex align-items-center">
            <span className="fas fa-address-book" />
            <input
              type="text"
              name="contact"
              id="contact"
              placeholder="Contact"
              value={contact}
              onChange={handleContactChange}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-envelope" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key" />
            <input type="file" name="image" onChange={handleImageChange} />
          </div>

          <button className="btn mt-3" onClick={handleRegistration}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
