import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import DbConnect from "./database/DbConnect.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/error.js";
import UserRouter from "./router/UserRouter.js";
import timelineRouter from "./router/timelineRouter.js";
import skillRoute from "./router/skillRoute.js";
import ProjectRoute from "./router/ProjectRoute.js";
import AboutRouter from "./router/AboutRouter.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

// ✅ Allowed origins
const allowedOrigins = [
  process.env.PORTFOLIO_URL,
  process.env.DASHBOARD_URL
].filter(Boolean);

console.log("Allowed origins:", allowedOrigins);

// Request logger middleware
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// ✅ CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman / server requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed for ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/UserRouter", UserRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/skillRouter", skillRoute);
app.use("/api/v1/ProjectRoute", ProjectRoute);
app.use("/api/v1/AboutRouter", AboutRouter);

// Database
DbConnect();

// Error middleware
app.use(errorMiddleware);

export default app;
