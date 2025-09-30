import express from "express";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  const result = a + b;

  res.json({ data: result });
});

app.post("/multiply", (req, res) => {
  const { a, b } = req.body;
  const result = a * b;

  res.json({ data: result });
});
