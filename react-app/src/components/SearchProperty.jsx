import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleBuyClick = (property) => {
    // Handle displaying property details here
    console.log("Buy clicked for property:", property);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/filter?city=${selectedCity}&rooms=${selectedRooms}&status=${selectedStatus}`
      );
      setProperties(response.data);
      setResultMessage(response.data.length === 0 ? "Result not found" : "");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const updateSearchKeyword = (event) => {
    const { name, value } = event.target;
    setSearchKeyword(value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleRoomsChange = (event) => {
    setSelectedRooms(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      <section id="home" className="section_addproperty">
        <div className="container-fluid ">
          <br />
          <br />
          <br />
          <br />

          <div className="row">
            <div className="col-sm-12 section_1_div">
              <div className="col-sm-12 ">
                <br />
                <h2>
                  <span style={{ color: "#292929" }}>
                    Search Properties For
                  </span>
                </h2>
                <br />
              </div>
              <div className="section_1_form col-sm-12">
                <form>
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4 pt-2 ">
                      <select
                        name="city"
                        id="city"
                        onChange={handleCityChange}
                        className="form-select form-select-md search_option"
                      >
                        <option>Select City</option>
                        <option value="">All Cities</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Islamabad">Islamabad</option>
                      </select>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 pt-2">
                      <select
                        name="rooms"
                        id="rooms"
                        onChange={handleRoomsChange}
                        className="form-select form-select-md search_option"
                      >
                        <option>Select Number of Rooms</option>
                        <option value="">All rooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 pt-2">
                      <select
                        name="status"
                        id="status"
                        onChange={handleStatusChange}
                        className="form-select form-select-md search_option"
                      >
                        <option>Select Status</option>
                        <option value="">All</option>
                        <option value="rent">Rent</option>
                        <option value="sale">Sale</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary properties-btn"
                      onClick={handleSearch}
                    >
                      Search Properties{" "}
                      <i className="fa-solid fa-arrow-right" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <center>
        <h1>{resultMessage}</h1>
      </center>
      <div className="divcards">
        {properties.map((property) => (
          <PropertyCard
            key={property.Prop_ID}
            property={property}
            onBuyClick={handleBuyClick}
          />
        ))}
      </div>
    </>
  );
};

export default PropertyList;
