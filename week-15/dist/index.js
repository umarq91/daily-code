"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = new client_1.PrismaClient();
const PORT = 3000;
// Function to ensure database connection
async function connectDB() {
    try {
        await client.$connect();
        console.log("✅ Database connected successfully!");
    }
    catch (error) {
        console.error("❌ Failed to connect to the database:", error);
        process.exit(1); // Exit the process if the database connection fails
    }
}
// Handle the root GET route
app.get("/", async (req, res) => {
    try {
        const users = await client.user.findMany();
        res.json({
            message: "Healthy server",
            users, // Include users in the response
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
// Handle the POST route
app.post("/add", async (req, res) => {
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
    }
    catch (error) {
        console.error("Error while creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
});
// Gracefully shut down Prisma Client when the app closes
process.on("SIGINT", async () => {
    await client.$disconnect();
    console.log("🛑 Prisma Client disconnected");
    process.exit(0);
});
// Start the server
app.listen(PORT, async () => {
    await connectDB(); // Ensure database connection before starting
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
