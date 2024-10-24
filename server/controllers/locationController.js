import Location from "../models/location.js";

export const getNearbyProperties = async (req, res) => {
  const { longitude, latitude, radius } = req.query;


  // await Location.insertMany([
  //   {
  //     name: "Property One",
  //     location: {
  //       type: "Point",
  //       coordinates: [67.125126, 24.932475], // Longitude first, Latitude second (GeoJSON format)
  //     },
  //     city: "Karachi",
  //     status: "Available",
  //     price: "25,000,000 PKR",
  //   },
  //   {
  //     name: "Property Two",
  //     location: {
  //       type: "Point",
  //       coordinates: [67.107689, 24.920348],
  //     },
  //     city: "Karachi",
  //     status: "Sold",
  //     price: "18,500,000 PKR",
  //   },
  //   {
  //     name: "Property Three",
  //     location: {
  //       type: "Point",
  //       coordinates: [67.100291, 24.940852],
  //     },
  //     city: "Karachi",
  //     status: "Under Construction",
  //     price: "30,000,000 PKR",
  //   },
  // ]);

  try {
    const properties = await Location.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(latitude), parseFloat(longitude)],
            parseFloat(radius) / 6378.1, // Radius in radians
          ],
        },
      },
    });

    res.status(200).json({
      status: "success",
      results: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};
