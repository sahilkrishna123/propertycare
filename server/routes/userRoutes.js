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

///////////////////////////

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);
// // Restrict access to all routes after this middleware
// // router.use(authController.restrictTo("admin"));

// // Protect all routes after this middleware
// router.use(authController.protect);

// // User Dashboard
// router.get("/dashboard");
// router.get("/me", userController.getMe, userController.getUser);
// router.patch(
//   "/updateMe",
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );
// // router.post('/request-school-access', userController.requestSchoolAccess);
// router.patch("/deleteMe", userController.deleteMe);
export default router;
