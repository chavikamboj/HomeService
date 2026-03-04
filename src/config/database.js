const { Sequelize } = require("sequelize");
require("dotenv").config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const sequelize = new Sequelize(
  process.env.DB_NAME || "homeservice",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;