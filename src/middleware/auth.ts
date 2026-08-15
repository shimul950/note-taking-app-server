
import { Request, Response, NextFunction } from "express";
import { jwtUtils } from "../utils/jwt";
import { cookieUtils } from "../utils/cookie";
import { envVars } from "../app/config/env";

import status from "http-status";
import AppError from "../app/errorHelpers/appError";

export interface IAuthUser {
  id: string;
  role: "user" | "admin";
}

export interface AuthRequest extends Request {
  user?: IAuthUser;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = cookieUtils.getCookie(req, "accessToken");

  if (!token) {
    return next(new AppError(status.UNAUTHORIZED, "No token provided"));
  }

  const result = jwtUtils.verifyToken(token, envVars.ACCESS_TOKEN_SECRET);

  if (!result.success) {
    return next(new AppError(status.UNAUTHORIZED, "Invalid or expired token"));
  }

  req.user = result.data as IAuthUser;
  next();
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    return next(new AppError(status.FORBIDDEN, "Admins only"));
  }
  next();
}