"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireAdmin = requireAdmin;
const jwt_1 = require("../utils/jwt");
const cookie_1 = require("../utils/cookie");
const env_1 = require("../app/config/env");
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../app/errorHelpers/appError"));
function requireAuth(req, res, next) {
    const token = cookie_1.cookieUtils.getCookie(req, "accessToken");
    if (!token) {
        return next(new appError_1.default(http_status_1.default.UNAUTHORIZED, "No token provided"));
    }
    const result = jwt_1.jwtUtils.verifyToken(token, env_1.envVars.ACCESS_TOKEN_SECRET);
    if (!result.success) {
        return next(new appError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid or expired token"));
    }
    req.user = result.data;
    next();
}
function requireAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
        return next(new appError_1.default(http_status_1.default.FORBIDDEN, "Admins only"));
    }
    next();
}
