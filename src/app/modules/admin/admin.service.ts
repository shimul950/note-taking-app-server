
import status from "http-status";
import {
  ICreateUserPayload,
  IUpdateUserPayload,
  IPaginationQuery,
} from "./admin.interface";
import { User } from "../../../models/user";
import AppError from "../../errorHelpers/appError";
import { hashPassword } from "../../../utils/password";
import { Note } from "../../../models/note";

const listUsers = async ({ page = 1, limit = 10 }: IPaginationQuery) => {
  const [users, total] = await Promise.all([
    User.find()
      .select("-passwordHash")
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(),
  ]);

  return { data: users, page, total, pages: Math.ceil(total / limit) };
};

const createUser = async (payload: ICreateUserPayload) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new AppError(status.CONFLICT, "Email already registered");
  }

  const passwordHash = await hashPassword(payload.password);

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    passwordHash,
    role: payload.role ?? "user",
    interests: payload.interests ?? [],
  });

  return user;
};

const updateUser = async (id: string, payload: IUpdateUserPayload) => {
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("-passwordHash");

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return user;
};

const listAllNotes = async ({ page = 1, limit = 10 }: IPaginationQuery) => {
  const [notes, total] = await Promise.all([
    Note.find()
      .populate("owner", "name email")
      .skip((page - 1) * limit)
      .limit(limit),
    Note.countDocuments(),
  ]);

  return { data: notes, page, total, pages: Math.ceil(total / limit) };
};

export const adminServices = {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  listAllNotes,
};