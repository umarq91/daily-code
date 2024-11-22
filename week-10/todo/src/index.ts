import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import client from "../db";

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
console.log("testing");
