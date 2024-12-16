import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const client = new PrismaClient();

// Handle the root GET route
app.get("/", async (req, res) => {
    try {
        const users = await client.user.findMany();
        res.json({
            message: "Healthy server",
            users, // Include users in the response
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Handle the POST route
app.post("/", async (req, res) => {
    const { email, name } = req.body;

    // Simple validation
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const newUser = await client.user.create({
            data: {
                email,
                name,
            },
        });

        res.status(201).json({
            message: "Done signing up!",
            user: newUser, // Return the newly created user
        });
    } catch (error) {
       console.log("error");
       
    }
});

// Gracefully shut down Prisma Client when the app closes
process.on("SIGINT", async () => {
    await client.$disconnect();
    process.exit(0);
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
