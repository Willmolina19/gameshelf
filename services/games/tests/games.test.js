import { describe, test, expect, beforeAll } from "@jest/globals";
import request from "supertest";

let app;

beforeAll(async () => {
  process.env.JWT_SECRET = "test-secret";
  ({ default: app } = await import("../src/app.js"));
});

describe("Games API", () => {
  test("GET /api/games requiere autenticacion", async () => {
    const response = await request(app).get("/api/games");

    expect(response.status).toBe(401);
  });
});
