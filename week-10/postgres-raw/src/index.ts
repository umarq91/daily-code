import express from "express";
import { client, connectToDatabase } from "./db"; // Just use the already connected client
import userRoutes from "./routes/auth"
import postsRoutes from "./routes/posts"

const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (err) {
    console.error("Failed to start the server:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();


app.use('/api/users', userRoutes)
app.use('/api/posts', postsRoutes)