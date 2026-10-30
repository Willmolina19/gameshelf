import { describe, test, expect, beforeAll } from "@jest/globals";
import request from "supertest";
import jwt from "jsonwebtoken";

let app;

beforeAll(async () => {
  process.env.JWT_SECRET = "test-secret";
  ({ default: app } = await import("../src/app.js"));
});

describe("Games API - autenticacion JWT", () => {
  test("rechaza solicitudes sin token", async () => {
    const response = await request(app).get("/api/games");
    expect(response.status).toBe(401);
  });

  test("rechaza tokens invalidos", async () => {
    const response = await request(app)
      .get("/api/games")
      .set("Authorization", "Bearer token-invalido");

    expect(response.status).toBe(401);
  });

  test("acepta JWT valido en el middleware", async () => {
    const token = jwt.sign(
      { id: 5, email: "test@gameshelf.com" },
      process.env.JWT_SECRET
    );

    const { verifyToken } = await import("../src/middlewares/verifyToken.js");

    const req = {
      headers: { authorization: `Bearer ${token}` }
    };

    const res = {
      status: () => res,
      json: () => res
    };

    let authenticated = false;

    verifyToken(req, res, () => {
      authenticated = true;
    });

    expect(authenticated).toBe(true);
    expect(req.user.id).toBe(5);
  });
});
