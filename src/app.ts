import express, { Application } from "express"
import dns from 'dns';
import { connectDB } from "./app/config/db";

const app: Application = express();

//body parser 
app.use(express.json());

dns.setServers(['8.8.8.8', '8.8.4.4']);

//connect to database
connectDB()


//basic route
app.get("/", (req, res) => {
  res.send("API is running12ffff");
});

export default app