import express from "express";
import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/signup",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  authController.signup
);
router.post("/login", authController.login);

router.get("/portfolio/:id", userController.getUserPortfolio);
router.get("/", userController.getUser);

export default router;
