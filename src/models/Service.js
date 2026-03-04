const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Booking = require("./Booking");

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// 🔗 Relation
Service.hasMany(Booking);
Booking.belongsTo(Service);

module.exports = Service;