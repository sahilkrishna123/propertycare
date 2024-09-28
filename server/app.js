import express from "express";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

// import viewRouter from "./routes/viewRoutes.js";
import userRouter from "./routes/userRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js";
// import schoolRouter from "./routes/schoolRoutes.js";
import AppError from "./utils/appError.js";
// import globalErrorHandler from "./controllers/errorController.js";

import cors from "cors";

// Security Dependencies
import compression from "compression";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import hpp from "hpp";

const app = express();

// Serving Static files
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
app.use(express.static(`${__dirname}/public`));

// 1) GLOBAL MIDDLEWARES

app.use(cors());

// Set Security HTTP Headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Load environment variables
dotenv.config({ path: "./config.env" });

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

// Error Handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// app.use(globalErrorHandler);

export default app;
