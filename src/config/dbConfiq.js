import mongoose from "mongoose";
import config from "./index.js";

export const dbConnection = () => {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));
};