const request = require("supertest");
const app = require("../src/app"); // ✅ make sure src/app.js exports `app`

describe("Booking Flow", () => {
  let adminToken;
  let userToken;
  let serviceId;
  let bookingId;

  const adminCred = {
    name: "Admin CI",
    email: "admin.ci@test.com",
    password: "123456",
    role: "admin",
  };

  const userCred = {
    name: "User CI",
    email: "user.ci@test.com",
    password: "123456",
    role: "user",
  };

  beforeAll(async () => {
    // ✅ Register admin (ignore if already exists)
    await request(app).post("/api/auth/register").send(adminCred);

    // ✅ Login admin
    const adminLogin = await request(app).post("/api/auth/login").send({
      email: adminCred.email,
      password: adminCred.password,
    });

    expect(adminLogin.statusCode).toBe(200);
    expect(adminLogin.body.token).toBeTruthy();
    adminToken = adminLogin.body.token;

    // ✅ Register user
    await request(app).post("/api/auth/register").send(userCred);

    // ✅ Login user
    const userLogin = await request(app).post("/api/auth/login").send({
      email: userCred.email,
      password: userCred.password,
    });

    expect(userLogin.statusCode).toBe(200);
    expect(userLogin.body.token).toBeTruthy();
    userToken = userLogin.body.token;
  });

  it("Admin should create service", async () => {
    const res = await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "AC Repair",
        description: "AC gas refill and servicing",
        price: 1500,
      });

    expect([200, 201]).toContain(res.statusCode);

    // Some controllers return { service: {...} } others return {...}
    serviceId = res.body.service?.id || res.body.id || res.body.serviceId;
    expect(serviceId).toBeTruthy();
  });

  it("User should create booking", async () => {
    const res = await request(app)
      .post("/api/bookings/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        bookingDate: "2026-03-10",
        address: "Delhi",
        serviceId: serviceId,
      });

    expect([200, 201]).toContain(res.statusCode);

    bookingId = res.body.booking?.id || res.body.id || res.body.bookingId;
    expect(bookingId).toBeTruthy();
  });

  it("Admin should confirm booking", async () => {
    const res = await request(app)
      .patch(`/api/bookings/${bookingId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "confirmed" });

    expect(res.statusCode).toBe(200);
  });

  it("User should cancel booking", async () => {
    const res = await request(app)
      .patch(`/api/bookings/${bookingId}/cancel`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
  });
});