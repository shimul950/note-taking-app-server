
import { Request, Response } from "express";
import status from "http-status";

import { adminServices } from "./admin.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponce } from "../../shared/sendResponce";

const listUsers = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await adminServices.listUsers({ page, limit });

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await adminServices.createUser(req.body);

  sendResponce(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await adminServices.updateUser(req.params.id as string, req.body);

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await adminServices.deleteUser(req.params.id as string);

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User deleted successfully",
    data: null,
  });
});

const listAllNotes = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await adminServices.listAllNotes({ page, limit });

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Notes retrieved successfully",
    data: result,
  });
});

export const adminControllers = {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  listAllNotes,
};