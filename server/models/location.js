import mongoose from "mongoose";
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  city: String,
  status: String,
  price: String,
});

locationSchema.index({ location: "2dsphere" }); // Enable geospatial indexing

const Location = mongoose.model("Location", locationSchema);

export default Location;
