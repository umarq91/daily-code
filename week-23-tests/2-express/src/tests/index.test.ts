import { describe, expect, it } from "@jest/globals";

import request from "supertest";
import { app } from "../index";

describe("GET /", () => {
  it("should add two values correctly", async () => {
    const res = await request(app).post("/sum").send({ a: 2, b: 3 });
    expect(res.body.data).toBe(5);
    expect(res.status).toBe(200);
  });
  it("should add two values correctly greater numbers", async () => {
    const res = await request(app).post("/sum").send({ a: 30000, b: 3 });

    expect(res.body.message).toBe("Numbers needs to be less than 1000");
    expect(res.status).toBe(422);
  });

  it("should Always have a value", async () => {
    const res = await request(app).post("/sum").send({  });

    expect(res.body.message).toBe("INVALID INPUTS");
    expect(res.status).toBe(400);
  });
});

describe("multiplication", () => {
  it("should multiply two values correctly", async () => {
    const res = await request(app).post("/multiply").send({ a: 10, b: 3 });

    expect(res.body.data).toBe(30);
    expect(res.status).toBe(200);
  });
});

describe("minus", () => {
  it("Should minus two values correctly", async () => {
    const res = await request(app).post("/minus").send({ a: 10, b: 40 });

    expect(res.body.data).toBe(-30);
    expect(res.status).toBe(200);
  });
});
