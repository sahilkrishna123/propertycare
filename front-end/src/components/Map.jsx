import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState([
    40.785091, -73.968285,
  ]);
  const [searchRadius, setSearchRadius] = useState(1);
  const [nearbyProperties, setNearbyProperties] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersLayerRef = useRef(null); // Reference to marker layer

  // Get the user's current location when the component mounts
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

  // Initialize the map once when the component mounts
  useEffect(() => {
    const leafletMap = L.map(mapContainerRef.current).setView(
      currentLocation,
      13
    );
    mapRef.current = leafletMap;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(leafletMap);

    // Add an initial marker for the user's location
    L.marker(currentLocation)
      .addTo(leafletMap)
      .bindPopup("Your current location")
      .openPopup();

    // Initialize an empty markers layer for nearby properties
    markersLayerRef.current = L.layerGroup().addTo(leafletMap);

    return () => {
      leafletMap.remove(); // Cleanup the map when component unmounts
    };
  }, []);

  // Fetch nearby properties when currentLocation or searchRadius changes
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [longitude, latitude] = currentLocation;
        const response = await axios.get(
          "http://localhost:5000/api/v1/properties/nearby-properties",
          {
            params: {
              longitude,
              latitude,
              radius: searchRadius, // in kilometers
            },
          }
        );
        console.log(response.data.properties);

        setNearbyProperties(response.data.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };

    if (currentLocation.length) {
      fetchProperties();
    }
  }, [currentLocation, searchRadius]);

  // Update the markers layer whenever nearbyProperties change
  useEffect(() => {
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers(); // Clear existing markers
    }

    nearbyProperties.forEach((property) => {
      const coordinates = property.location?.coordinates;
      if (coordinates && coordinates.length === 2) {
        L.marker(coordinates.reverse())
          .addTo(markersLayerRef.current)
          .bindPopup(property.name);
      }
    });
  }, [nearbyProperties]);

  const handleSearch = () => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

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

    nearbyProperties.forEach((property) => {
      const coordinates = property.location?.coordinates;
      if (coordinates && coordinates.length === 2) {
        L.marker(coordinates.reverse())
          .addTo(leafletMap)
          .bindPopup(property.name);
      }
    });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Search Properties</h1>
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
      </form><br/>
      <div
        ref={mapContainerRef}
        style={{
          height: "400px",
          width: "1000px",
          margin: "auto",
          border: "2px solid darkgray",
          borderRadius: "20px",
          boxShadow: "5px 5px 5px #aaaaaa",
        }}
      /><br/>
      <h2>Nearby Properties</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', justifyContent: 'center' }}>
        {nearbyProperties.map((property) => (
          <div
            key={property._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              margin: "8px",
              width: "300px",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <center>
              <h3>{property.name}</h3>
            </center>
            <p>City: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{property.city}</p>
            <p>Status:&nbsp; {property.status}</p>
            <p>Price: &nbsp;&nbsp;&nbsp;&nbsp;{property.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
