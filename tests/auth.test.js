const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
  it("should register user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@test.com",
      password: "123456",
      role: "user",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("testuser@test.com");
  });

  it("should login user and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});