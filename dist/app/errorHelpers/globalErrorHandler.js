"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const env_1 = require("../config/env");
function globalErrorHandler(err, req, res, next) {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong";
    if (err instanceof appError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    // Mongoose duplicate key error (e.g. email unique constraint)
    if (err && typeof err === "object" && err.code === 11000) {
        statusCode = http_status_1.default.CONFLICT;
        message = "Duplicate field value entered";
    }
    res.status(statusCode).json({
        success: false,
        message,
        ...(env_1.envVars.NODE_ENV === "development" && { stack: err?.stack }),
    });
}
