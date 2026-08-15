"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./app/config/db");
const routes_1 = require("./routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = require("./app/errorHelpers/notFound");
const globalErrorHandler_1 = require("./app/errorHelpers/globalErrorHandler");
const app = (0, express_1.default)();
//middleware to parse JSON bodies
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//connect to database
(0, db_1.connectDB)()
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
app.use('/api', routes_1.indexRoutes);
//basic route
app.get("/", (req, res) => {
    res.send("API is running12ffff");
});
app.use(notFound_1.notFound);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
