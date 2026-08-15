import express, { Application } from "express"
import dns from 'dns';
import { connectDB } from "./app/config/db";
import { indexRoutes } from "./routes";
import cookieParser from 'cookie-parser'

const app: Application = express();

//middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

dns.setServers(['8.8.8.8', '8.8.4.4']);

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

export default app