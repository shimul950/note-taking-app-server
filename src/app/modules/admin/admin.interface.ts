
import { Types } from "mongoose";

export interface ICreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  interests?: string[];
}

export interface IUpdateUserPayload {
  name?: string;
  email?: string;
  role?: "user" | "admin";
  interests?: string[];
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
}

export interface IUserSummary {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: "user" | "admin";
  interests: string[];
}