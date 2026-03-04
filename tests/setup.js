process.env.NODE_ENV = "test";

const sequelize = require("../src/config/database");

beforeAll(async () => {
  // fresh test DB every run
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // close DB pool (fixes "Jest did not exit")
  await sequelize.close();
});