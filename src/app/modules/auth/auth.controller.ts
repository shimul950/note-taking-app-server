// auth.controller.ts
import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.service";
import { tokenUtils } from "../../../utils/token";
import { sendResponce } from "../../shared/sendResponce";
import { AuthRequest } from "../../../middleware/auth";
import { cookieUtils } from "../../../utils/cookie";


const register = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authServices.register(payload);

  const { accessToken, refreshToken, ...rest } = result;

  tokenUtils.setAccesssTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponce(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authServices.login(payload);

  const { accessToken, refreshToken, ...rest } = result;

  tokenUtils.setAccesssTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await authServices.getMe(req.user!.id);

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

const logout = catchAsync(async (req: AuthRequest, res: Response) => {
  cookieUtils.clearCookie(res, "accessToken", { httpOnly: true, path: "/" });
  cookieUtils.clearCookie(res, "refreshToken", { httpOnly: true, path: "/" });

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Logged out successfully",
    data: null,
  });
});



export const authControllers = {
  register,
  login,
  getMe,
  logout
};