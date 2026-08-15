"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const auth_service_1 = require("./auth.service");
const token_1 = require("../../../utils/token");
const sendResponce_1 = require("../../shared/sendResponce");
const register = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const result = await auth_service_1.authServices.register(payload);
    const { accessToken, refreshToken, ...rest } = result;
    token_1.tokenUtils.setAccesssTokenCookie(res, accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, refreshToken);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "User registered successfully",
        data: {
            accessToken,
            refreshToken,
            ...rest,
        },
    });
});
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const result = await auth_service_1.authServices.login(payload);
    const { accessToken, refreshToken, ...rest } = result;
    token_1.tokenUtils.setAccesssTokenCookie(res, accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, refreshToken);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Logged in successfully",
        data: {
            accessToken,
            refreshToken,
            ...rest,
        },
    });
});
exports.authControllers = {
    register,
    login,
};
