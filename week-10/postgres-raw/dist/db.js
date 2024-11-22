"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = new pg_1.Client({
    connectionString: process.env.DB_URL
});
exports.client.connect()
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("Err connecting to db", err));
