import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());//middleware
app.use(cors());

const port=process.env.PORT || 4002;
const URI=process.env.MONGODB_URI;

try{
    mongoose.connect(URI)
    console.log("Connected to MongoDB")
}catch(error){
    console.log(error);
}
//route
app.use("/user",userRoute);

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`)
})