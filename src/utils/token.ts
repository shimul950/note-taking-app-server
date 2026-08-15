import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { Response } from "express";
import { cookieUtils } from "./cookie";
import { envVars } from "../app/config/env";


const getAccessToken =(payload: JwtPayload) =>{
    const accessToken = jwtUtils.createToken(
        payload, 
        envVars.ACCESS_TOKEN_SECRET,
        {expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN} as SignOptions)

    return accessToken;
}

const getRefreshToken =(payload: JwtPayload) =>{
    const refreshtoken = jwtUtils.createToken(
        payload, 
        envVars.REFRESH_TOKEN_SECRET, 
        {expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN} as SignOptions);
    return refreshtoken;
}

const setAccesssTokenCookie = (res:Response, token: string) =>{
    cookieUtils.setCookie(res, 'accessToken', token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path:"/",
        // 1 day
        maxAge: 60*60*24*1000,

    })
}

const setRefreshTokenCookie = (res:Response, token: string) =>{
    cookieUtils.setCookie(res, 'refreshToken', token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path:"/",
        // 7 day
        maxAge: 60*60*24*1000*7

    })
}

export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccesssTokenCookie,
    setRefreshTokenCookie,
}