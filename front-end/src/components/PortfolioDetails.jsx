import React, { useEffect, useState } from "react";
import axios from "axios";

function PortfolioDetails() {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioproperties, setportfolioproperties] = useState([]);
  const [error, setError] = useState(null);
  const storedUser = localStorage.getItem("user");
  const userjson = JSON.parse(storedUser);
  const id = userjson.userid;
  console.log("ID is: ", id);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/portfolio/${id}`
        );
        setPortfolio(response.data);
        // console.log("res: ",response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching portfolio details: " + error.message);
      }
    };

    fetchPortfolio();
  }, [id]);

  useEffect(() => {
    const fetchPortfolioProp = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/portfolioproperties/${id}`
        );
        setportfolioproperties(response.data);
        console.log("res2: ", response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching portfolio details: " + error.message);
      }
    };

    fetchPortfolioProp();
  }, [id]);

  console.log("Property details are:", portfolioproperties);

  return (
    <>
      <br />
      <div className="polaroid">
        <br />
        <img
          src={`data:image/png;base64,${portfolio.user_img}`}
          alt="User"
          width="270px"
          height="300px"
        />
        <div className="container">
          <h2> {portfolio.User_Name}</h2>
          <p>Phone: {portfolio.Contact}</p>
          <p>Email: {portfolio.Email}</p>
        </div>
      </div>

      <hr />
      <center>
        <h1>MY PROPERTIES</h1>
      </center>
      <div className="divcards">
        {portfolioproperties.map((property) => (
          <>
            <div key={property.Prop_ID}>
              <div
                className="card2 "
                style={{ width: "23rem", height: "29rem ", margin: "40px" }}
              >
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
                  <div className="card-text ">
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
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default PortfolioDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function PortfolioDetails() {

//     const [portfolio, setPortfolio] = useState([]);

//     const storedUser = localStorage.getItem("user");
//     const userjson = JSON.parse(storedUser);
//     const id = userjson.userid;
//     console.log("ID is: ", id);

//         const response = axios.get(
//           `http://localhost:5000/portfolio/${id}`
//         );
//         setPortfolio(response.data);

//       console.log("USER details are:",portfolio);

//     return (
//         <>

//         </>
//     );
// }
// export default PortfolioDetails;
