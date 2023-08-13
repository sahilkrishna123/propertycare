import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertyCard = ({ property, onBuyClick }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [builderDetails, setBuilderDetails] = useState([]);

  const handleBackClick = () => {
    setShowDetails(false);
  };

  const storedUser = localStorage.getItem("user");
  const userjson = JSON.parse(storedUser);
  const id = userjson.userid;

  const handleBuyClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search/${property.Prop_ID}`
      );
      setBuilderDetails(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setShowDetails(true);
    onBuyClick(property);
  };

  return (
    <div
      className="card2"
      style={{ width: "23rem", height: "33rem", margin: "40px" }}
    >
      {showDetails ? (
        <div>
          <br />
          <h1>Builder Details</h1>
          <figure>
            <img
              src={`data:image/png;base64,${builderDetails.user_img}`}
              alt="Builder"
              width="100%"
              height="230px"
            />
            <figcaption>{builderDetails.User_Name}</figcaption>
          </figure>

          <h3>{builderDetails.User_Name} </h3>
          <hr />
          <h5>Phone: {builderDetails.Contact} </h5>
          <h5>Email: {builderDetails.Email} </h5>

          {/* Back button */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
      ) : (
        <div>
          <figure>
            <img
              src={`data:image/png;base64,${property.prop_image}`}
              alt="Property"
              width="100%"
              height="230px"
            />
            <figcaption>{property.Desciption}</figcaption>
          </figure>
          <div className="card-body">
            <h3 className="card-title">{property.Desciption}</h3>
            <div className="card-text">
              <br />
              <h4>Price: ${property.Price}</h4>
              <div className="div_room_status">
                <h4>Rooms: {property.Room}</h4>
                <h4>Status: {property.Status}</h4>
              </div>
              <hr />
              <h6>
                Address: {property.Adress}, Zip Code: {property.zipCode}
              </h6>
            </div>

            {/* Buy button */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleBuyClick}
            >
              Builder Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
