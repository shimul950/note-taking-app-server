
import { Schema, model, Types } from "mongoose";

interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  interests: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    interests: [{ type: String }],
  },
  { timestamps: true }
);

userSchema.index({ interests: 1 });

export const User = model<IUser>("User", userSchema);