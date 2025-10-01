import express from "express";
import z, { parse } from "zod";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
const rules = z.object({
  a: z.number(),
  b: z.number(),
});
app.post("/sum", async (req, res) => {
  const parsed = rules.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "INVALID INPUTS",
    });
  }
  if (!parsed.data) return;
  const { a, b } = parsed.data;
  const result = a + b;

  if (a > 1000 || b > 1000) {
    res.status(422).json({
      message: "Numbers needs to be less than 1000",
    });
  }

  res.json({ data: result });
});

app.post("/multiply", (req, res) => {
  const { a, b } = req.body;
  const result = a * b;

  res.json({ data: result });
});

app.post("/minus", (req, res) => {
  const { a, b } = req.body;
  const result = a - b;

  res.json({ data: result });
});
