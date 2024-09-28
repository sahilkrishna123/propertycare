import * as factory from "./handlerFactory.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import multer from "multer";
import sharp from "sharp";
import Property from "../models/propertyModel.js"; // Ensure you're using Property model
import mongoose from "mongoose";
// Multer storage and file filter
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

// Multer upload setup
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware for uploading the property photo
export const uploadPropertyPhoto = upload.single("image");

// Middleware for resizing the property photo
export const resizePropertyPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next(); // Call next() if no file is uploaded

  req.file.filename = `property-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(700, 700)
    .toFormat("jpg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/properties/${req.file.filename}`);

  // Attach the filename to req.body to save it in the database
  req.body.image = req.file.filename;

  next(); // Proceed to the next middleware
});

// Controller for adding a property
export const addProperty = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;

  // Create a new property using the Property model
  const newProperty = await Property.create({
    description: req.body.description,
    status: req.body.status,
    room: req.body.room,
    price: req.body.price,
    address: req.body.address,
    zipcode: req.body.zipcode,
    image: req.body.image, // The image filename from req.body
    // userId: req.body.userId,
  });

  // 2. Add the newly created property ObjectId to the user's 'property' field
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    // { name: "jason bourne" },
    { $push: { property: newProperty._id } }, // Push the property ObjectId to the 'property' array
    { new: true } // Return the updated user document
  );

  console.log(updatedUser);

  // Send a success response
  res.status(201).json({
    status: "success",
    data: {
      property: newProperty,
    },
  });
});

export const searchProperties = async (req, res) => {
  try {
    const { city, rooms, status } = req.query;

    // Build the query based on provided filters
    const query = {};

    if (city) {
      query.address = new RegExp(city, "i"); // Case-insensitive search for city
    }

    if (rooms) {
      query.room = rooms;
    }

    if (status) {
      query.status = status;
    }

    // Perform the query on the Property collection
    const properties = await Property.find(query);

    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }

    console.log(properties);

    res.status(200).json({
      status: "success",
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};
