import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { ApplicationRoutes } from "./routes/routes.js";
import { dbConnection } from "./config/dbConfiq.js";
import config from "./config/index.js";
import httpStatus from "http-status";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
dotenv.config();

const app = express();
const PORT = config.PORT || 5000;

const corsOption = {
  origin: true,
};

// DB Conncetion
dbConnection();

// Middlewares
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());

// Routes
app.use("/api/v1", ApplicationRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Medicare server." });
});

// Global Error Hanlder
app.use(globalErrorHandler);

// Not Found API Error
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found!",
    errorMessages: [{ path: req.originalUrl, message: "API Not Found!" }],
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
