const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
    defaultValue: "pending"
  }
});

module.exports = Booking;