

import { User } from "../../../models/user";
import { comparePassword, hashPassword } from "../../../utils/password";
import { tokenUtils } from "../../../utils/token";
import AppError from "../../errorHelpers/appError";
import { IRegisterPayload, ILoginPayload, IAuthResult } from "./auth.interface";

import status from "http-status";

const register = async (payload: IRegisterPayload): Promise<IAuthResult> => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new AppError(status.CONFLICT, "Email already registered");
  }

  const passwordHash = await hashPassword(payload.password);

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    passwordHash,
    interests: payload.interests ?? [],
  });

  const jwtPayload = { id: user._id.toString(), role: user.role };

  const accessToken = tokenUtils.getAccessToken(jwtPayload);
  const refreshToken = tokenUtils.getRefreshToken(jwtPayload);

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

const login = async (payload: ILoginPayload): Promise<IAuthResult> => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
  }

  const isMatch = await comparePassword(payload.password, user.passwordHash);
  if (!isMatch) {
    throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = { id: user._id.toString(), role: user.role };

  const accessToken = tokenUtils.getAccessToken(jwtPayload);
  const refreshToken = tokenUtils.getRefreshToken(jwtPayload);

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

export const authServices = {
  register,
  login,
};