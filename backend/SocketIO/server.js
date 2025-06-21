import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Allow CORS for frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // ✅ Make sure this matches your frontend
    methods: ["GET", "POST"],
  },
});

// In-memory user tracking (userId -> socket.id)
const users = {};

// 🔌 Export this to find receiver socket for private message emit
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    console.log("🟢 User connected:", userId);
  }

  // 🔁 Emit current online users to all clients
  io.emit("getOnlineUsers", Object.keys(users));

  // 🔴 When a user disconnects
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
