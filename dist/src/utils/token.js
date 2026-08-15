"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenUtils = void 0;
const jwt_1 = require("./jwt");
const cookie_1 = require("./cookie");
const env_1 = require("../app/config/env");
const getAccessToken = (payload) => {
    const accessToken = jwt_1.jwtUtils.createToken(payload, env_1.envVars.ACCESS_TOKEN_SECRET, { expiresIn: env_1.envVars.ACCESS_TOKEN_EXPIRES_IN });
    return accessToken;
};
const getRefreshToken = (payload) => {
    const refreshtoken = jwt_1.jwtUtils.createToken(payload, env_1.envVars.REFRESH_TOKEN_SECRET, { expiresIn: env_1.envVars.REFRESH_TOKEN_EXPIRES_IN });
    return refreshtoken;
};
const setAccesssTokenCookie = (res, token) => {
    cookie_1.cookieUtils.setCookie(res, 'accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        // 1 day
        maxAge: 60 * 60 * 24 * 1000,
    });
};
const setRefreshTokenCookie = (res, token) => {
    cookie_1.cookieUtils.setCookie(res, 'refreshToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        // 7 day
        maxAge: 60 * 60 * 24 * 1000 * 7
    });
};
exports.tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccesssTokenCookie,
    setRefreshTokenCookie,
};
