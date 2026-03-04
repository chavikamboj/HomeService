const { Server } = require("socket.io");

let io = null;

// init socket server
const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // abhi frontend later, isliye open
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // client apna userId send karega to join room
    socket.on("join", ({ userId }) => {
      if (!userId) return;
      socket.join(String(userId));
      console.log(`✅ User joined room: ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  return io;
};

// use this anywhere to emit
const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

module.exports = { initSocket, getIO };