// auth.controller.ts
import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.service";
import { tokenUtils } from "../../../utils/token";
import { sendResponce } from "../../shared/sendResponce";


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

export const authControllers = {
  register,
  login,
};