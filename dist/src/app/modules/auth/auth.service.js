"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const user_1 = require("../../../models/user");
const password_1 = require("../../../utils/password");
const token_1 = require("../../../utils/token");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const http_status_1 = __importDefault(require("http-status"));
const register = async (payload) => {
    const existing = await user_1.User.findOne({ email: payload.email });
    if (existing) {
        throw new appError_1.default(http_status_1.default.CONFLICT, "Email already registered");
    }
    const passwordHash = await (0, password_1.hashPassword)(payload.password);
    const user = await user_1.User.create({
        name: payload.name,
        email: payload.email,
        passwordHash,
        interests: payload.interests ?? [],
    });
    const jwtPayload = { id: user._id.toString(), role: user.role };
    const accessToken = token_1.tokenUtils.getAccessToken(jwtPayload);
    const refreshToken = token_1.tokenUtils.getRefreshToken(jwtPayload);
    return {
        accessToken,
        refreshToken,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
const login = async (payload) => {
    const user = await user_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    const isMatch = await (0, password_1.comparePassword)(payload.password, user.passwordHash);
    if (!isMatch) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    const jwtPayload = { id: user._id.toString(), role: user.role };
    const accessToken = token_1.tokenUtils.getAccessToken(jwtPayload);
    const refreshToken = token_1.tokenUtils.getRefreshToken(jwtPayload);
    return {
        accessToken,
        refreshToken,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
exports.authServices = {
    register,
    login,
};
