import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Import your routes
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

// Import your Socket.IO app and server from the correct file
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// Define the port, ensuring it's consistent with your proxy
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json()); // To parse JSON payloads from requests
app.use(cookieParser()); // To parse cookies from requests

// REMOVED: app.use(cors());
// It's insecure and conflicts with the Socket.IO's specific CORS config.
// The Vite proxy handles API CORS during development.

// Route Middleware
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Start the server and connect to the database
server.listen(PORT, () => {
  // Use the correct promise-based syntax for DB connection
  mongoose
    .connect(URI)
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((error) => {
      console.log("❌ Error connecting to MongoDB:", error.message);
    });
  console.log(`🚀 Server is Running on port ${PORT}`);
});
