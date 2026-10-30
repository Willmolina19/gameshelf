import { describe, test, expect } from "@jest/globals";
import request from "supertest";
import { execFileSync } from "node:child_process";

const gateway = "http://localhost:3000";

describe("RabbitMQ - evento usuario.creado", () => {
  test("Games recibe el evento cuando Auth registra un usuario", async () => {
    const unique = Date.now();
    const email = `rabbit-${unique}@gameshelf.test`;

    const response = await request(gateway)
      .post("/api/auth/register")
      .send({
        username: `rabbit${unique}`,
        email,
        password: "TestPassword123!",
      });

    expect(response.status).toBe(201);

    let received = false;

    for (let attempt = 0; attempt < 10; attempt++) {
      const logs = execFileSync(
        "docker",
        ["compose", "logs", "games", "--no-color", "--tail", "100"],
        { encoding: "utf8" }
      );

      if (logs.includes(email) || logs.includes(`rabbit${unique}`)) {
        received = true;
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    expect(received).toBe(true);
  }, 15000);
});
