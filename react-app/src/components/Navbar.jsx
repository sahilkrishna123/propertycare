import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header ">
      <nav className="navbar navbar-expand-lg  fixed-top navbar-style">
        <div className="container-fluid ">
          <a className="navbar-brand" href="#">
            <img src={Logo} alt="Property Care" width="60px" height="50px" />
          </a>
          <a className="navbar-brand" href="#">
            <span style={{ color: "white" }}>Property Care</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navitems"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navitems">
            <ul className="navbar-nav ms-auto">
              <li className="navbar-item">
                <NavLink className="nav-link" to="/">
                  HOME
                </NavLink>
              </li>

              {auth ? (
                <>
                  <li>
                    <NavLink className="nav-link" to="/addproperty">
                      ADD Property
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="nav-link" to="/search">
                      Search Property
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/map">
                      Search on Map
                    </NavLink>
                  </li>


                  <li className="navbar-item">
                    <a className="nav-link" href="/portfolio">
                   
                    {auth && JSON.parse(auth)?.userName}
                    
                    </a>
                  </li>

                  <li>
                    <NavLink className="nav-link" onClick={logout} to="/">
                      Log Out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink className="nav-link" to="/contact">
                      LOG IN
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}

              {/* <li>
                <NavLink className="nav-link" to="/gallery">
                  Gallery
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

{
  /* <Link to="/">Home</Link>
<Link to="/about">About US</Link> */
}
