
import { Request, Response, NextFunction } from "express";
import status from "http-status";
import AppError from "./appError";
import { envVars } from "../config/env";


export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // Mongoose duplicate key error (e.g. email unique constraint)
  if (err && typeof err === "object" && (err as { code?: number }).code === 11000) {
    statusCode = status.CONFLICT;
    message = "Duplicate field value entered";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(envVars.NODE_ENV === "development" && { stack: (err as Error)?.stack }),
  });
}