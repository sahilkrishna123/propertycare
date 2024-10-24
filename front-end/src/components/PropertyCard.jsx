import  { useState, useEffect } from "react";
import axios from "axios";

const PropertyCard = ({ property, onBuyClick }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [builderDetails, setBuilderDetails] = useState(null);

  const handleBackClick = () => {
    setShowDetails(false);
  };

  const storedUser = localStorage.getItem("user");
  let response = null;
  const handleBuyClick = async () => {
    try {
      console.log(property);
      
      console.log("PropID: ", property._id);
      
      response = await axios.get(
        `http://localhost:5000/api/v1/properties/search/${property._id}`
      );
      
      setBuilderDetails(response.data.data); 
      console.log("response data:", response.data.data);

      
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
          {  console.log("Builder Details:", builderDetails.photo)
          }
          <figure>
            <img
            src={`http://localhost:5000/img/users/${builderDetails.photo}`}

              alt="Builder"
              width="100%"
              height="230px"
            />
            <figcaption>{builderDetails.name}</figcaption>
          </figure>

          <h3>{builderDetails.name} </h3>
          <hr />
          <h5>Phone: {builderDetails.contact} </h5>
          <h5>Email: {builderDetails.email} </h5>

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
              src={`http://localhost:5000/img/properties/${property.image}`}

              alt="Property"
              width="100%"
              height="230px"
            />
            <figcaption>{property.description}</figcaption>
          </figure>
          <div className="card-body">
            <h3 className="card-title">{property.description}</h3>
            <div className="card-text">
              <br />
              <h4>Price: ${property.price}</h4>
              <div className="div_room_status">
                <h4>Rooms: {property.room}</h4>
                <h4>Status: {property.status}</h4>
              </div>
              <hr />
              <h6>
                Address: {property.address}, Zip Code: {property.zipcode}
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
