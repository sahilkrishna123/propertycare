import express from "express";
import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";
import * as propertyController from "../controllers/propertyController.js";
const router = express.Router();

router.post(
  "/add-property",
  propertyController.uploadPropertyPhoto,
  propertyController.resizePropertyPhoto,
  propertyController.addProperty
);

router.get("/search-property", propertyController.searchProperties);

export default router;
