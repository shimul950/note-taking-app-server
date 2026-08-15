
import { Response } from "express";
import status from "http-status";

import { postServices } from "./post.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponce } from "../../shared/sendResponce";
import { AuthRequest } from "../../../middleware/auth";

const createPost = catchAsync(async (req: AuthRequest, res: Response) => {
  const post = await postServices.createPost(req.user!.id, req.body);

  sendResponce(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

export const postControllers = {
  createPost,
};