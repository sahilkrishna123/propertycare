import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/1.png";

function Register() {
  const [userName, setUserName] = useState("");
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

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
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
    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("contact", contact);
    formData.append("email", email);
    formData.append("usertype", usertype);
    formData.append("image", image);

    const response = await axios.post(
      "http://localhost:5000/api/register",
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
    setUserName(""); // Clear input fields
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
              name="userName"
              id="userName"
              placeholder="Username"
              value={userName}
              onChange={handleUserNameChange}
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

// // Simple Registeration
// import React, { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handlePhoneChange = (event) => {
//     setPhone(event.target.value);
//   };

//   const handleRegistration = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/register", {
//         userName,
//         password,
//         phone,
//       });
//       console.log(response.data);
//       // Optionally, you can show a success message or redirect the user

//     } catch (error) {
//       console.error("Error registering user:", error);
//       // Optionally, you can show an error message
//     }
//   };

//   return (
//     <>
//       <div className="wrapper">
//         <div className="logo">
//           <img
//             src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
//             alt=""
//           />
//         </div>
//         <div className="text-center mt-4 name">Twitter</div>
//         <form className="p-3 mt-3">
//           <div className="form-field d-flex align-items-center">
//             <span className="far fa-user" />
//             <input
//               type="text"
//               name="userName"
//               id="userName"
//               placeholder="Username"
//               value={userName}
//               onChange={handleUserNameChange}
//             />
//           </div>
//           <div className="form-field d-flex align-items-center">
//             <span className="fas fa-key" />
//             <input
//               type="password"
//               name="password"
//               id="pwd"
//               placeholder="Password"
//               value={password}
//               onChange={handlePasswordChange}
//             />
//           </div>
//           <div className="form-field d-flex align-items-center">
//             <span className="fas fa-phone" />
//             <input
//               type="text"
//               name="phone"
//               id="phone"
//               placeholder="Phone"
//               value={phone}
//               onChange={handlePhoneChange}
//             />
//           </div>
//           <button className="btn mt-3" onClick={handleRegistration}>
//             Register
//           </button>
//         </form>
//         <div className="text-center fs-6">
//           <a href="#">Forget password?</a> or <a href="#">Sign up</a>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;
