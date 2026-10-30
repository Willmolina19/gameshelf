import { jest, describe, test, expect, beforeAll } from "@jest/globals";
import request from "supertest";

let app;

beforeAll(async () => {
  process.env.JWT_SECRET = "test-secret";
  ({ default: app } = await import("../src/app.js"));
});

describe("Auth API", () => {
  test("POST /api/auth/register rechaza datos invalidos", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({});

    expect(response.status).toBe(400);
  });

  test("POST /api/auth/login rechaza datos invalidos", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(response.status).toBe(400);
  });
});
