const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();
const http = require("http");

const sequelize = require("./src/config/database");
const app = require("./src/app");
const { initSocket } = require("./src/socket");

// Load models once (so relations register)
require("./src/models/User");
require("./src/models/Service");
require("./src/models/Booking");

const server = http.createServer(app);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database Connected ✅");

    // email env check
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log("Email env found ✅");
    } else {
      console.log("Email env missing ❌");
    }

    initSocket(server);

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => console.log("DB Error ❌", err));