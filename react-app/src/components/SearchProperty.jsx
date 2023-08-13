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

// // complete working search proeprties
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CardDetails from "./CardDetails";

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedRooms, setSelectedRooms] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [resultMessage, setResultMessage] = useState("");

//   const [showDetails, setShowDetails] = useState(false);

//   const handleBuyClick = () => {
//     setShowDetails(true);
//   };

//   const handleBackClick = () => {
//     setShowDetails(false);
//   };

//   // useEffect(() => {
//   //   fetchProperties();
//   // }, []);

//   // const fetchProperties = async () => {
//   //   try {
//   //     const response = await axios.get("http://localhost:5000/api/properties");
//   //     setProperties(response.data);
//   //   } catch (error) {
//   //     console.error("Error fetching properties:", error);
//   //   }
//   // };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/filter?city=${selectedCity}&rooms=${selectedRooms}&status=${selectedStatus}`
//       );
//       setProperties(response.data);
//       setResultMessage(response.data.length === 0 ? "Result not found" : "");
//       console.log(response.data);

//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }

//   };

//   const updateSearchKeyword = (event) => {
//     const { name, value } = event.target;
//     setSearchKeyword(value);
//   };

//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//   };

//   const handleRoomsChange = (event) => {
//     setSelectedRooms(event.target.value);
//   };

//   const handleStatusChange = (event) => {
//     setSelectedStatus(event.target.value);
//   };

//   return (
//     <>

// <section id="home" className="section_addproperty">
//   <div className="container-fluid "><br/><br/>
//    <br/><br/>

//     <div className="row">
//       <div className="col-sm-12 section_1_div">
//         <div className="col-sm-12 "><br/ >
//         <h2><span style={{ color: "#292929" }}>Search Properties For</span></h2>
//           <br />
//         </div>
//         <div className="section_1_form col-sm-12">
//           <form>
//             <div className="row">
//             <div className="col-sm-12 col-md-6 col-lg-4 pt-2 ">
//                 <select name="city" id="city" onChange={handleCityChange} className="form-select form-select-md search_option">
//           <option >Select City</option>
//           <option value="">All Cities</option>
//           <option value="Karachi">Karachi</option>
//           <option value="Lahore">Lahore</option>
//           <option value="Hyderabad">Hyderabad</option>
//           <option value="Islamabad">Islamabad</option>
//         </select>
//               </div>
//               <div className="col-sm-12 col-md-6 col-lg-4 pt-2">
//               <select name="rooms" id="rooms" onChange={handleRoomsChange} className="form-select form-select-md search_option">
//           <option >Select Number of Rooms</option>
//           <option value="">All rooms</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//         </select>
//               </div>
//               <div className="col-sm-12 col-md-6 col-lg-4 pt-2">
//               <select name="status" id="status" onChange={handleStatusChange} className="form-select form-select-md search_option">
//           <option >Select Status</option>
//           <option value="">All</option>
//           <option value="rent">Rent</option>
//           <option value="sale">Sale</option>
//         </select>
//               </div>

//               <button type="button" className="btn btn-primary properties-btn" onClick={handleSearch}>
//                 Search Properties <i className="fa-solid fa-arrow-right" />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

// {/*
//       {properties.map((property) => (
//         <div key={property.Prop_ID}>
//           <div>

//             <p>Description: {property.Desciption}</p>
//             <p>Status: {property.Status}</p>
//             <p>Adress: {property.Adress}</p>
//             <p>Zip Code: {property.zipCode}</p>
//             <p>Room: {property.Room}</p>
//             <p>Price: {property.Price}</p>
//             <p>Image: {property.image}</p>
//             <img src={`data:image/png;base64,${property.prop_image}`} alt="Property" />
//           </div>
//         </div>
//       ))} */}

// <center><h1>{resultMessage}</h1></center>

// <div className="divcards">
//       {properties.map((property) => (

//       <>

//         <div key={property.Prop_ID}>
//           <div className="card2 " style={{ width: "23rem" ,height :"29rem ",margin: "40px"}}>
// <figure>
//     <img src={`data:image/png;base64,${property.prop_image}`} alt="Property"  width="100%" height="230px" />
//     <figcaption>{property.Desciption}</figcaption>
// </figure>
//   <div className="card-body">
//     <h3 className="card-title">{property.Desciption}</h3>
//     <div className="card-text ">
//         <br/ >
//     <h4>Price: ${property.Price}</h4>
//     <div className="div_room_status">
//     <h4>Rooms: {property.Room}</h4>
//     <h4>Status: {property.Status}</h4>
//     </div><hr />
//     <h6>Address: {property.Adress}, Zip Code: {property.zipCode}</h6>

//     </div>

//   </div>
// </div>

//         </div>

//       </>))}
// </div>

// <div>
//       {!showDetails ? (
//         <h1>Dummy card</h1>
//       ) : (
//         <CardDetails
//           title="Dummy Card"
//           description="This is a dummy card."
//           price="99.99"
//           image="https://placekitten.com/200/300" // Replace with your image URL
//           onBackClick={handleBackClick}
//         />
//       )}
//       {!showDetails && (
//         <button className="btn btn-primary mt-3" onClick={handleBuyClick}>
//           Buy
//         </button>
//       )}
//     </div>

//     </>
//   );
// };

// export default PropertyList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedRooms, setSelectedRooms] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/properties");
//       setProperties(response.data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/filter?city=${selectedCity}&rooms=${selectedRooms}&status=${selectedStatus}`
//       );
//       setProperties(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   const updateSearchKeyword = (event) => {
//     const { name, value } = event.target;
//     setSearchKeyword(value);
//   };

//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//   };

//   const handleRoomsChange = (event) => {
//     setSelectedRooms(event.target.value);
//   };

//   const handleStatusChange = (event) => {
//     setSelectedStatus(event.target.value);
//   };

//   return (
//     <>
//       <div>
//         <h1>Table data</h1>

//         <label>City</label>
//         <select name="city" id="city" onChange={handleCityChange}>
//           <option value="">Select City</option>
//           <option value="Karachi">Karachi</option>
//           <option value="Lahore">Lahore</option>
//           <option value="Hyderabad">Hyderabad</option>
//         </select>

//         <label>Number of rooms</label>
//         <select name="rooms" id="rooms" onChange={handleRoomsChange}>
//           <option value="">Select Number of Rooms</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//         </select>

//         <label>Status</label>
//         <select name="status" id="status" onChange={handleStatusChange}>
//           <option value="">Select Status</option>
//           <option value="buy">Buy</option>
//           <option value="sale">Sale</option>
//         </select>
//       </div>

//       <button onClick={handleSearch}>Search</button>

//       {properties.map((property) => (
//         <div key={property.Prop_ID}>
//           <p>{property.desciption}</p>

//         </div>
//       ))}
//     </>
//   );
// };

// export default PropertyList;

// // filter box
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/properties");
//       setProperties(response.data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/search/${searchKeyword}`
//       );
//       setProperties(response.data);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };
//   const updateSearchKeyword = (event) => {
//     const selectedValue = event.target.value;
//     setSearchKeyword(selectedValue);
//   };

//   return (
//     <>
//       <div>
//         <h1>Table data</h1>

//         <label >City</label>

//         <select name="id" id="id" onChange={updateSearchKeyword}>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </select>

//       </div>

//       <button onClick={handleSearch}>Search</button>

//       {properties.map((property) => (
//         <div key={property.id}>
//           <h2>{property.title}</h2>
//           <p>{property.description}</p>
//           <p>Price: {property.price}</p>
//           <p>Location: {property.location}</p>
//           <img src={property.image_url} alt={property.title} />
//         </div>
//       ))}
//     </>
//   );
// };

// export default PropertyList;

// // Search box
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/properties");
//       setProperties(response.data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/search/${searchKeyword}`
//       );
//       setProperties(response.data);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setSearchKeyword(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Table data</h1>
//       <input
//         type="text"
//         placeholder="Search ..."
//         value={searchKeyword}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleSearch}>Search</button>

//       {properties.map((property) => (
//         <div key={property.id}>
//           <h2>{property.title}</h2>
//           <p>{property.description}</p>
//           <p>Price: {property.price}</p>
//           <p>Location: {property.location}</p>
//           <img src={property.image_url} alt={property.title} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PropertyList;
