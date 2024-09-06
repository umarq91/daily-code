"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_1 = require("./db");
app.use(express_1.default.json());
db_1.client
    .query("SELECT NOW()") // Sample query to check the connection
    .then((res) => {
    console.log("Database connection successful");
    app.listen(3000, () => console.log("Server started on port 3000"));
})
    .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process if DB connection fails
});
