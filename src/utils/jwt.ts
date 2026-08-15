
import jwt from "jsonwebtoken";

interface Payload {
  id: string;
  role: "user" | "admin";
}

export const signToken = (payload: Payload) =>
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1d" });

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string) as Payload;