import { describe, test, expect } from "@jest/globals";
import request from "supertest";

const gateway = "http://localhost:3000";

describe("API Gateway - integracion", () => {
  test("GET /api/health responde correctamente", async () => {
    const response = await request(gateway).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.service).toBe("gateway");
  });

  test("POST /api/auth/register valida datos", async () => {
    const response = await request(gateway)
      .post("/api/auth/register")
      .send({});

    expect(response.status).toBe(400);
  });

  test("GET /api/games rechaza solicitudes sin JWT", async () => {
    const response = await request(gateway).get("/api/games");

    expect(response.status).toBe(401);
  });
});
