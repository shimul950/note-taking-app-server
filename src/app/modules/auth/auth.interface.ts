
import { Types } from "mongoose";

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  interests?: string[];
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IJwtPayload {
  id: string;
  role: "user" | "admin";
}

export interface IAuthResult {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: "user" | "admin";
  };
}