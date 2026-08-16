
import { Response } from "express";
import status from "http-status";

import { noteServices } from "./note.service";
import { catchAsync } from "../../shared/catchAsync";
import { AuthRequest } from "../../../middleware/auth";
import { sendResponce } from "../../shared/sendResponce";

const createNote = catchAsync(async (req: AuthRequest, res: Response) => {
  const note = await noteServices.createNote(req.user!.id, req.body);

  sendResponce(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Note created successfully",
    data: note,
  });
});

const getNoteById = catchAsync(async (req: AuthRequest, res: Response) => {
  const note = await noteServices.getNoteById(req.user!.id, req.params.id as string);

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Note retrieved successfully",
    data: note,
  });
});

const listMyNotes = catchAsync(async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await noteServices.listMyNotes(req.user!.id, { page, limit });

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Notes retrieved successfully",
    data: result,
  });
});

const updateNote = catchAsync(async (req: AuthRequest, res: Response) => {
  const note = await noteServices.updateNote(req.user!.id, req.params.id as string, req.body);

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Note updated successfully",
    data: note,
  });
});

const deleteNote = catchAsync(async (req: AuthRequest, res: Response) => {
  await noteServices.deleteNote(req.user!.id, req.params.id as string);

  sendResponce(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Note deleted successfully",
    data: null,
  });
});

export const noteControllers = {
  createNote,
  listMyNotes,
  updateNote,
  deleteNote,
  getNoteById
};