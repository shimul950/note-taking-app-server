import mongoose from "mongoose";
import { envVars } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    const uri = envVars.MONGODB_URI;
    console.log("uri",uri)
    if (!uri) throw new Error("MONGODB_URI not defined in .env");

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};