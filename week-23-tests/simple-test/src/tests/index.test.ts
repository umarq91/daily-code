import { describe, expect, it } from "@jest/globals";
import { multiply, sum } from "../index";
describe("sum", () => {
  it("should add two numbers", () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });

  it("should minus two numbers", () => {
    const result = sum(-2, -4);
    expect(result).toBe(-6);
  });
});

describe("multiply", () => {
  it("should multiply two numbers", () => {
    const result = multiply(2, 3);
    expect(result).toBe(6);
  });

  it("should multipl two numbers", () => {
    const result = multiply(-2, -4);
    expect(result).toBe(8);
  });
});
