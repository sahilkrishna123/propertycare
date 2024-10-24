import express from "express";
import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";
import * as propertyController from "../controllers/propertyController.js";
import * as locationController from "../controllers/locationController.js";
const router = express.Router();
// router.use(authController.protect);
router.post(
  "/add-property",
  propertyController.uploadPropertyPhoto,
  propertyController.resizePropertyPhoto,
  propertyController.addProperty
);

router.get("/search-property", propertyController.searchProperties);
router.get("/nearby-properties", locationController.getNearbyProperties);
router.get("/search/:id", propertyController.getuserOnProperty);
export default router;
