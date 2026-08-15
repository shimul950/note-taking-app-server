import express, { Application } from "express"

import { connectDB } from "./app/config/db";
import { indexRoutes } from "./routes";
import cookieParser from 'cookie-parser'
import { notFound } from "./app/errorHelpers/notFound";
import { globalErrorHandler } from "./app/errorHelpers/globalErrorHandler";

const app: Application = express();

//middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());



//connect to database
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });


app.use('/api', indexRoutes)

//basic route
app.get("/", (req, res) => {
  res.send("API is running12ffff");
});


app.use(notFound);
app.use(globalErrorHandler);

export default app