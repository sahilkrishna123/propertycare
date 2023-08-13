// Proper Login system
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/1.png";

function Contact() {
  const [userName, setUserName] = useState("");
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

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        userName,
        password,
        result,
      });

      const { success, message, userData } = response.data;
      console.log(userid);
      if (success) {
        setLoginStatus("success");

        localStorage.setItem("user", JSON.stringify(message));
        alert("Logged in successfully");
        navigate("/");
      } else {
        setLoginStatus("failed");
        alert("Invalid username or password");
        setUserName("");
        setPassword("");
      }
      // this have message all user data
      console.log("User data is : ", JSON.stringify(message.result[0].User_ID));
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
          <button className="btn mt-3" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;

// // Proper Login system
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Contact() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginStatus, setLoginStatus] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = localStorage.getItem("user");

//     if (auth) {
//       alert("Logged in successfully");
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         userName,
//         password,
//       });

//       const { success, message, userData } = response.data;

//       if (success) {
//         setLoginStatus("success");
//         localStorage.setItem("user", JSON.stringify(userData));
//         alert("Logged in successfully");
//         navigate("/");
//       } else {
//         setLoginStatus("failed");
//         alert("Invalid username or password");
//         setUserName("");
//         setPassword("");
//       }

//       console.log(message);
//     } catch (error) {
//       console.error("Error logging in:", error);
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
//           <button className="btn mt-3" onClick={handleLogin}>
//             Login
//           </button>
//         </form>
//         <div className="text-center fs-6">
//           <a href="#">Forgot password?</a> or <a href="#">Sign up</a>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Contact;

// //Validation Login local storage
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Contact() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginStatus, setLoginStatus] = useState("");

//   const navigate = useNavigate();

//   useEffect(()=>{
//     const auth = localStorage.getItem('user');

//     if (auth){

//       alert("Logged In  successfully");
//       navigate('/')
//       //window.location.reload();

//     }
//   })

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         userName,
//         password,
//       });
//       const { success, message } = response.data;
//       if (success) {
//         setLoginStatus("success");
//       } else {
//         setLoginStatus("failed");
//       }
//       console.log(message);

//       const userData = {
//         userName: response.data.userName,
//         password: response.data.password,
//         phone: response.data.phone,
//       };

//       localStorage.setItem("user", JSON.stringify(userData));

//     } catch (error) {
//       console.error("Error logging in:", error);
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
//           <button className="btn mt-3" onClick={handleLogin}>
//             Login
//           </button>
//         </form>
//         <div className="text-center fs-6">
//           <a href="#">Forget password?</a> or <a href="#">Sign up</a>
//         </div>
//         {loginStatus === "success" && (
//           <div className="popup success">
//             <div className="popup-content">
//               <h3>Login Successful!</h3>
//               <p>You have been logged in successfully.</p>
//             </div>
//           </div>
//         )}
//         {loginStatus === "failed" && (
//           <div className="popup failed">
//             <div className="popup-content">
//               <h3>Login Failed!</h3>
//               <p>Invalid username or password.</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Contact;

// //Validation Login
// import React, { useState } from "react";
// import axios from "axios";

// function Contact() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginStatus, setLoginStatus] = useState("");

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         userName,
//         password,
//       });
//       const { success, message } = response.data;
//       if (success) {
//         setLoginStatus("success");
//       } else {
//         setLoginStatus("failed");
//       }
//       console.log(message);
//     } catch (error) {
//       console.error("Error logging in:", error);
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
//           <button className="btn mt-3" onClick={handleLogin}>
//             Login
//           </button>
//         </form>
//         <div className="text-center fs-6">
//           <a href="#">Forget password?</a> or <a href="#">Sign up</a>
//         </div>
//         {loginStatus === "success" && (
//           <div className="popup success">
//             <div className="popup-content">
//               <h3>Login Successful!</h3>
//               <p>You have been logged in successfully.</p>
//             </div>
//           </div>
//         )}
//         {loginStatus === "failed" && (
//           <div className="popup failed">
//             <div className="popup-content">
//               <h3>Login Failed!</h3>
//               <p>Invalid username or password.</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Contact;

// // Simple Login form
// import React, { useState } from "react";

// function Contact() {

//  return <>

//   <div className="wrapper">
//   <div className="logo">
//     <img
//       src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
//       alt=""
//     />
//   </div>
//   <div className="text-center mt-4 name">Twitter</div>
//   <form className="p-3 mt-3">
//     <div className="form-field d-flex align-items-center">
//       <span className="far fa-user" />
//       <input type="text" name="userName" id="userName" placeholder="Username" />
//     </div>
//     <div className="form-field d-flex align-items-center">
//       <span className="fas fa-key" />
//       <input type="password" name="password" id="pwd" placeholder="Password" />
//     </div>
//     <button className="btn mt-3">Login</button>
//   </form>
//   <div className="text-center fs-6">
//     <a href="#">Forget password?</a> or <a href="#">Sign up</a>
//   </div>
// </div>

//   </>;
// }
// export default Contact;
