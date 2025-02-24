import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cors from "cors";
import {connect} from "mongoose"
import { router } from "./router/user.routes.js";
import  cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin:"https://foodierecipesing.netlify.app"
}));
app.use(express.json());
app.use(cookieParser());


const connectDb = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

app.use("/api", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
