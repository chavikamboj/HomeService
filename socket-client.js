const { io } = require("socket.io-client");

// ⚠️ Yaha user id daalni hai (phpMyAdmin me Chavi = 4)
const USER_ID = 4;

const socket = io("http://localhost:5000", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
  socket.emit("join", { userId: USER_ID });
});

socket.on("booking:created", (data) =>
  console.log("📌 EVENT booking:created", data)
);

socket.on("booking:status_updated", (data) =>
  console.log("✅ EVENT booking:status_updated", data)
);

socket.on("booking:cancelled", (data) =>
  console.log("❌ EVENT booking:cancelled", data)
);