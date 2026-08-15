"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const appError_1 = __importDefault(require("../errorHelpers/appError"));
const http_status_1 = __importDefault(require("http-status"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requireEnvVariable = [
        'NODE_ENV',
        'PORT',
        "MONGODB_URI",
        'ACCESS_TOKEN_SECRET',
        'REFRESH_TOKEN_SECRET',
        'ACCESS_TOKEN_EXPIRES_IN',
        'REFRESH_TOKEN_EXPIRES_IN',
    ];
    requireEnvVariable.forEach((variable) => {
        const key = variable.trim();
        if (!process.env[key]) {
            throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Environment variable is ${key} required but not set in .env file.`);
        }
    });
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        MONGODB_URI: process.env.MONGODB_URI,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    };
};
exports.envVars = loadEnvVariables();
