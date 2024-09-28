import { useEffect, useState } from "react";
import axios from "axios";

function PortfolioDetails() {
  const [portfolio, setPortfolio] = useState([]);
  const [error, setError] = useState(null);
  const storedUser = localStorage.getItem("user");
  const userjson = JSON.parse(storedUser);
  const id = userjson.data.user._id;

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/portfolio/${id}`
        );

        setPortfolio(response.data.data);
        console.log("res: ", response.data);

        setError(null);
      } catch (error) {
        setError("Error fetching portfolio details: " + error.message);
      }
    };

    fetchPortfolio();
  }, [id]);

  return (
    <>
      <br />
      <div className="polaroid">
        <br />
        <img
          src={(portfolio)? `http://localhost:5000/img/users/${portfolio.photo}`: ""}
        
          alt="User"
          width="270px"
          height="300px"
        />
        <div className="container">
          <h2> {portfolio.name}</h2>
          <p>Phone: {portfolio.contact}</p>
          <p>Email: {portfolio.email}</p>
        </div>
      </div>

      <hr />
      <center>
        <h1>MY PROPERTIES</h1>
      </center>
      <div className="divcards">
        {portfolio.property && portfolio.property.length > 0 ? (
          // Check if `portfolio.property` exists and is not empty
          portfolio.property.map((property) => (
            <div key={property._id}>
              <div
                className="card2"
                style={{ width: "23rem", height: "29rem", margin: "40px" }}
              >
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties available</p> 
        )}
      </div>
    </>
  );
}

export default PortfolioDetails;
