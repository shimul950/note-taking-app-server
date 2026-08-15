// aggregation.controller.ts
import { Request, Response } from "express";
import status from "http-status";

import { aggregationServices } from "./aggregation.service";
import { sendResponce } from "../../shared/sendResponce";
import { catchAsync } from "../../shared/catchAsync";

const groupUsersByInterests = catchAsync(async (req: Request, res: Response) => {
  const result = await aggregationServices.groupUsersByInterests();

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Users grouped by interests",
    data: result,
  });
});

const getUserPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await aggregationServices.getUserPosts(req.params.userId as string);

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User posts retrieved successfully",
    data: result,
  });
});

export const aggregationControllers = {
  groupUsersByInterests,
  getUserPosts,
};