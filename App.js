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

// ✅ CORS config
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Extra headers to avoid "No Access-Control-Allow-Origin"
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Request logger middleware
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/UserRouter", UserRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/skillRouter", skillRoute);
app.use("/api/v1/ProjectRoute", ProjectRoute);
app.use("/api/v1/AboutRouter", AboutRouter);

DbConnect();

// ✅ Error Middleware
app.use(errorMiddleware);

// ✅ Render ke liye PORT fix
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
