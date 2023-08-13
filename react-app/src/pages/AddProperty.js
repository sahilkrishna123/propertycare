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

    const storedUser = localStorage.getItem("user");
    const userjson = JSON.parse(storedUser);
    const id = userjson.userid;
    console.log("ID is: ", id);

    const formData = new FormData();
    formData.append("description", description);
    formData.append("status", status);
    formData.append("room", room);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("address", address);
    formData.append("zipcode", zipcode);
    formData.append("id", id);

    const response = await axios.post(
      "http://localhost:5000/api/addproperty",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    alert("Property Added Successfully");
    navigate("/");
    
    setRegistrationSuccess(true);
    setDescription("");
    setStatus("");
    setRoom("");
    setPrice("");
    setImage("");
    setAddress("");
    setZipCode("");
  };

  return (
    <>
      <br />
      <br />
      <br /><br />
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
          <option value="Sale">Sale</option>
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

        <button class=" btn add_property_btn" onClick={handleRegistration}>
          Add Property
        </button>
      </form>

      </div>
    </>
  );
}

export default AddProperty;



// const userData = {
    //   description: response.data.description,
    //   status: response.data.status,
    //   room: response.data.room,
    //   price: response.data.price,
    //   image: response.data.image,
    //   address: response.data.address,
    //   zipcode: response.data.zipcode,
    // };

    // localStorage.setItem("user", JSON.stringify(userData));
    // console.log(response.data);