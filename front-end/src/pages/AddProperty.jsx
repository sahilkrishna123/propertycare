import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [room, setRoom] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [userid, setUserid] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     const auth = localStorage.getItem('user');

  //     if (auth) {
  //       alert("Registered successfully");
  //       navigate('/');
  //     }
  //   }, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        throw new Error("User not found in local storage.");
      }

      const userjson = JSON.parse(storedUser);
      // console.log("UserID",userjson);

      const id = userjson.data.user._id;

      const formData = new FormData();
      formData.append("description", description);
      formData.append("status", status);
      formData.append("room", room);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("address", address);
      formData.append("zipcode", zipcode);
      formData.append("userId", id); // Updated key to match your model

      const response = await axios.post(
        "http://localhost:5000/api/v1/properties/add-property",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Check if the response is successful (status code 200-299)
      if (response.status >= 200 && response.status < 300) {
        alert("Property Added Successfully");
        navigate("/");

        setRegistrationSuccess(true);
        // Clear form fields
        setDescription("");
        setStatus("");
        setRoom("");
        setPrice("");
        setImage("");
        setAddress("");
        setZipCode("");
      } else {
        // Handle unexpected response
        alert(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);

      // Display error message to the user
      if (error.response) {
        alert(`Error: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        alert("No response from server. Please try again later.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="add_property_div">
        <h1>Add property</h1>

        <form className="row g-3 addpropertyform">
          <div className="form-floating col-lg-6 add_property_inputs">
            <input
              className="form-control"
              id="floatingInput"
              type="text"
              name="description"
              placeholder="House Number"
              value={description}
              onChange={handleDescriptionChange}
            />
            <label htmlFor="floatingInput">&nbsp; Description</label>
          </div>
          <div className="form-floating col-lg-3  add_property_inputs ">
            <input
              className="form-control"
              id="floatingInput"
              type="text"
              name="rooms"
              placeholder="No. of Rooms"
              value={room}
              onChange={handleRoomChange}
            />
            <label htmlFor="floatingInput">&nbsp; No. of Rooms</label>
          </div>
          <div className="form-floating col-lg-3 add_property_inputs">
            <input
              className="form-control"
              id="floatingInput"
              type="text"
              name="price"
              placeholder="Price of Property"
              value={price}
              onChange={handlePriceChange}
            />
            <label htmlFor="floatingInput">&nbsp; Price of Property</label>
          </div>

          <select
            className="form-select form-select-md add_property_selection"
            aria-label=" example"
            name="status"
            id="status"
            onChange={handleStatusChange}
          >
            <option selected>Select Status</option>
            <option value="Rent">Rent</option>
            <option value="Sell">Sell</option>
          </select>

          <div className="form-floating col-lg-6 add_property_inputs">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="form-control"
              id="floatingInput"
            />
            <label htmlFor="floatingInput">&nbsp; Image</label>
          </div>

          <div className="form-floating col-lg-6  add_property_inputs">
            <input
              className="form-control"
              id="floatingInput"
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={handleAddressChange}
            />
            <label htmlFor="floatingInput">Address</label>
          </div>

          <div className="form-floating col-lg-6 add_property_inputs ">
            <input
              className="form-control"
              id="floatingInput"
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              value={zipcode}
              onChange={handleZipCodeChange}
            />
            <label htmlFor="floatingInput">Zip Code</label>
          </div>

          <button className="btn add_property_btn" onClick={handleRegistration}>
            Add Property
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProperty;
