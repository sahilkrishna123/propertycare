import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// 24.9404101, 67.106047
const bangloewsData = [
  // { id: 1, name: "Bangloew A", location: [51.51, -0.1] },
  // { id: 2, name: "Bangloew B", location: [51.52, -0.11] },
  // { id: 3, name: "Bangloew C", location: [25.09, 67.11] },
  // { id: 4, name: "Bangloew C", location: [25.09, 67.11] },
  // { id: 5, name: "Bangloew C", location: [25.09, 67.11] },
  // { id: 6, name: "Bangloew C", location: [25.09, 67.11] },
  // {
  //   id: 7,
  //   name: "Bangloew C",
  //   location: [25.09, 67.11],
  //   city: "Sample City",
  //   status: "Sale", // or "Rent"
  //   price: "$500,000", // or any format you prefer
  // },
  // Add more bangloews as needed

// Nearby 5km radius

  {
    id: 2,
    name: "Villa A",
    location: [24.950, 67.120],
    city: "Karachi",
    status: "Sale",
    price: "$450,000"
  },
  {
    id: 3,
    name: "Apartment X",
    location: [24.930, 67.105],
    city: "Karachi",
    status: "Rent",
    price: "$1,200/month"
  },
  // ... (3 more objects)


// Nearby 10km radius

  {
    id: 6,
    name: "Mansion B",
    location: [24.910, 67.095],
    city: "Lahore",
    status: "Sale",
    price: "$800,000"
  },
  {
    id: 7,
    name: "Condo Y",
    location: [24.940, 67.135],
    city: "Lahore",
    status: "Rent",
    price: "$1,500/month"
  },
  // ... (3 more objects)


// Nearby 100km radius

  {
    id: 11,
    name: "Country House Z",
    location: [25.500, 67.500],
    city: "Islamabad",
    status: "Sale",
    price: "$1,200,000"
  },
  {
    id: 12,
    name: "Townhouse P",
    location: [25.200, 67.200],
    city: "Islamabad",
    status: "Rent",
    price: "$2,000/month"
  },
  // ... (3 more objects)


// Nearby 1000km radius

  {
    id: 16,
    name: "Lakefront Retreat",
    location: [27.000, 69.000],
    city: "Quetta",
    status: "Sale",
    price: "$1,800,000"
  },
  {
    id: 17,
    name: "Mountain View Lodge",
    location: [28.000, 70.000],
    city: "Peshawar",
    status: "Rent",
    price: "$2,500/month"
  },
  // ... (3 more objects)





];

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
  const [searchRadius, setSearchRadius] = useState(1);
  const [nearbyBangloews, setNearbyBangloews] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const leafletMap = L.map(mapContainerRef.current).setView(
      currentLocation,
      13
    );
    mapRef.current = leafletMap;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(leafletMap);

    L.marker(currentLocation)
      .addTo(leafletMap)
      .bindPopup("Your current location")
      .openPopup();

    const nearby = bangloewsData.filter((bangloew) => {
      const distance = calculateDistance(currentLocation, bangloew.location);
      return distance <= searchRadius;
    });

    setNearbyBangloews(nearby);

    nearby.forEach((bangloew) => {
      L.marker(bangloew.location).addTo(leafletMap).bindPopup(bangloew.name);
    });
  }, [currentLocation, searchRadius]);

  const handleSearch = () => {
    // Check if the map is already initialized and remove it if necessary
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Initialize a new map with updated search parameters
    const leafletMap = L.map(mapContainerRef.current).setView(
      currentLocation,
      13
    );
    mapRef.current = leafletMap;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(leafletMap);

    L.marker(currentLocation)
      .addTo(leafletMap)
      .bindPopup("Your current location")
      .openPopup();

    const nearby = bangloewsData.filter((bangloew) => {
      const distance = calculateDistance(currentLocation, bangloew.location);
      return distance <= searchRadius;
    });

    setNearbyBangloews(nearby);

    // Add markers for nearby bangloews
    nearby.forEach((bangloew) => {
      L.marker(bangloew.location).addTo(leafletMap).bindPopup(bangloew.name);
    });
  };

  const calculateDistance = (location1, location2) => {
    const [lat1, lon1] = location1;
    const [lat2, lon2] = location2;
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Search Properties</h1>
      <div>
        {/* <form>
          <label>
            Current Location:
            <input
            
              type="text"
              value={currentLocation.join(', ')}
              onChange={(e) => setCurrentLocation(e.target.value.split(',').map(parseFloat))}
            />
          </label>
          <br />
          <label>
            Search Radius (km):
            <input
              type="number"
              value={searchRadius}
              onChange={(e) => setSearchRadius(parseFloat(e.target.value))}
            />
          </label>
          <br />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </form> */}

        <form style={{ fontFamily: "Arial, sans-serif" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Current Location:
            <input
              type="text"
              value={currentLocation.join(", ")}
              onChange={(e) =>
                setCurrentLocation(e.target.value.split(",").map(parseFloat))
              }
              style={{
                marginLeft: "38px",
                padding: "4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <br />
          <label style={{ display: "block", marginBottom: "4px" }}>
            Search Radius (km):
            <input
              type="number"
              value={searchRadius}
              onChange={(e) => setSearchRadius(parseFloat(e.target.value))}
              style={{
                marginLeft: "14px",
                padding: "4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <br />
          <button
            type="button"
            onClick={handleSearch}
            style={{
              marginLeft: "8px",
              padding: "8px",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              width: "160px",
              fontSize: "21px",
            }}
          >
            Search
          </button>
          <br />
        </form>
      </div>
      <br />
      <div
        ref={mapContainerRef}
        style={{
          height: "400px",
          width: "1000px",
          margin: "auto",
          border: "2px solid darkgray",
          borderRadius:"20px",
          boxShadow: "5px 5px 5px #aaaaaa"
        }}
      />
      <div>
      <br />
        <h2>Nearby Properties</h2>


        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', justifyContent: 'center' }}>
  {nearbyBangloews.map((bangloew) => (
    <div
      key={bangloew.id}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        width: '300px',
        textAlign: 'left',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      <center>

     <h3>{bangloew.name}</h3>
      </center>
      <p>City: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bangloew.city}</p>
      <p>Status:&nbsp; {bangloew.status}</p>
      <p>Price: &nbsp;&nbsp;&nbsp;&nbsp;{bangloew.price}</p>
      {/* Add additional information or styling as needed */}
    </div>
  ))}
</div>


        {/* <ul>
          {nearbyBangloews.map((bangloew) => (
            <li key={bangloew.id}>{bangloew.name}</li>
          ))}
        </ul> */}

      </div>
    </div>
  );
};

export default Map;
