// filter box
import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

 

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search/${searchKeyword}`
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const updateSearchKeyword = (event) => {
    const selectedValue = event.target.value;
    setSearchKeyword(selectedValue);
  };

  return (
    <>
      <div>
        <h1>Table data</h1>

        <label htmlFor="cars">Select ID</label>

        <select name="id" id="id" onChange={updateSearchKeyword}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <button onClick={handleSearch}>Search</button>

      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <p>Price: {property.price}</p>
          <p>Location: {property.location}</p>
          <img src={property.image_url} alt={property.title} />
        </div>
      ))}
    </>
  );
};

export default PropertyList;

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
//     <div>
//       <h1>Table data</h1>

//       <label htmlFor="cars">Select ID</label>

//       <select name="id" id="id" onChange={updateSearchKeyword}>
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//       </select>
//     </div>

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
//     );
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/properties")
//       .then((response) => setProperties(response.data))
//       .catch((error) => console.error("Error fetching properties:", error));
//   }, []);

//   const searchHandle = async (event) =>{
//     let key = event.target.value;
//     if(key){
//       let result = await fetch(`http://localhost:5000/search/${key}`);
//       result = await result.json();
//       if (result){
//         setProperties(result)
//       }
//     }
//     else{
//       <h1>Show products</h1>
//     }

//   }

//   return (
//     <div>
//       <h1>Table data</h1>
//       <input type="text" placeholder="Search ..."
//       onChange={searchHandle}
//       />
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/properties")
//       .then((response) => setProperties(response.data))
//       .catch((error) => console.error("Error fetching properties:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Table data</h1>
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
