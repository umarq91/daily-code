import { describe, expect, it } from "@jest/globals";

import request from "supertest";
import { app } from "../index";

describe("GET /", () => {
  it("should add two values correctly", async () => {
    const res = await request(app).post("/sum").send({ a: 2, b: 3 });
    expect(res.body.data).toBe(5);
    expect(res.status).toBe(200);
  });
});

describe("multiplication", () => {
  it("should multiply two values correctly", async () => {
    const res = await request(app).post("/multiply").send({ a: 10, b: 3 });

    expect(res.body.data).toBe(30);
    expect(res.status).toBe(200);
  });
});
