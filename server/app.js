import express from "express";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

// import viewRouter from "./routes/viewRoutes.js";
import userRouter from "./routes/userRoutes.js";
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

// Setting Templating Engine
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES

app.use(cors());
// app.use(
//   cors({
//     origin: "https://myschool-mern-app-backend.vercel.app",
//     credentials: true,
//   })
// );
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))
// Access-Control-Allow-Headers: Authorization, Content-Type

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
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       "duration",
//       "ratingsQuantity",
//       "ratingsAverage",
//       "maxGroupSize",
//       "difficulty",
//       "price",
//     ],
//   })
// );

app.use(compression());

// // Initialize DynamoDB client with region from environment variables
// const client = new DynamoDBClient({
//   region: process.env.AWS_REGION, // Use region from .env
// });
// const docClient = DynamoDBDocumentClient.from(client);

// app.get("/", (req, res) => {
//   // res.send("Hello Krishna");
//   res.sendFile(path.join(__dirname, "public", "home.html"));
// });

// app.post("/add-item", async (req, res) => {
//   const command = new PutCommand({
//     TableName: "general_ledger",
//     Item: {
//       gr_num: 22, // Sample data
//     },
//   });

//   try {
//     const response = await docClient.send(command);
//     console.log("Item added:", response);
//     res.json({ success: true, data: response });
//   } catch (error) {
//     console.error("Error adding item:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// Routes
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/schools", schoolRouter);

// Error Handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// app.use(globalErrorHandler);

export default app;
