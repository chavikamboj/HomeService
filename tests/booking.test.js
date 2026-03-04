// ✅ Mock nodemailer email function so tests don't actually send emails
jest.mock("../src/utils/sendEmail", () => jest.fn().mockResolvedValue(true));

const request = require("supertest");
const app = require("../src/app");

let userToken;
let adminToken;
let serviceId;
let bookingId;

describe("Booking Flow", () => {
  beforeAll(async () => {
    // ✅ Register Admin
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@test.com",
      password: "123456",
      role: "admin",
    });

    // ✅ Login Admin
    const adminLogin = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "123456",
    });

    adminToken = adminLogin.body.token;

    // ✅ Register User
    await request(app).post("/api/auth/register").send({
      name: "User",
      email: "user@test.com",
      password: "123456",
      role: "user",
    });

    // ✅ Login User
    const userLogin = await request(app).post("/api/auth/login").send({
      email: "user@test.com",
      password: "123456",
    });

    userToken = userLogin.body.token;
  });

  it("Admin should create service", async () => {
    const res = await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "AC Repair",
        description: "AC Service",
        price: 1000,
      });

    // If your service controller returns 201
    expect([200, 201]).toContain(res.statusCode);

    // Some controllers return {service: {...}} others return {...}
    serviceId = res.body.service?.id || res.body.id;

    expect(serviceId).toBeTruthy();
  });

  it("User should create booking", async () => {
    const res = await request(app)
      .post("/api/bookings/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        serviceId,
        bookingDate: "2026-03-10",
        address: "Delhi",
      });

    expect([200, 201]).toContain(res.statusCode);

    bookingId = res.body.booking?.id || res.body.id;
    expect(bookingId).toBeTruthy();
  });

  it("Admin should confirm booking", async () => {
    const res = await request(app)
      .patch(`/api/bookings/${bookingId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "confirmed" });

    expect(res.statusCode).toBe(200);
    expect(res.body.booking?.status || res.body.status).toBeTruthy();
  });

  it("User should cancel booking", async () => {
    const res = await request(app)
      .patch(`/api/bookings/${bookingId}/cancel`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.booking?.status || res.body.status).toBeTruthy();
  });
});