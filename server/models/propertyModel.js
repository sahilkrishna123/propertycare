import mongoose from "mongoose";
// Define the schema for the data
const propertySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Rent", "Sell"],
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default.jpg",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

// Create the model from the schema
const Property = mongoose.model("Property", propertySchema);

export default Property;
