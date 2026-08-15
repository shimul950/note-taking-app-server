;
import status from "http-status";
import { ICreateNotePayload, IUpdateNotePayload, IPaginationQuery } from "./note.interface";
import { Note } from "../../../models/note";
import AppError from "../../errorHelpers/appError";

const createNote = async (ownerId: string, payload: ICreateNotePayload) => {
  const note = await Note.create({
    title: payload.title,
    content: payload.content,
    owner: ownerId,
  });

  return note;
};

const listMyNotes = async (ownerId: string, { page = 1, limit = 10 }: IPaginationQuery) => {
  const [notes, total] = await Promise.all([
    Note.find({ owner: ownerId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Note.countDocuments({ owner: ownerId }),
  ]);

  return { data: notes, page, total, pages: Math.ceil(total / limit) };
};

const updateNote = async (ownerId: string, noteId: string, payload: IUpdateNotePayload) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, owner: ownerId },
    payload,
    { new: true, runValidators: true }
  );

  if (!note) {
    throw new AppError(status.NOT_FOUND, "Note not found");
  }

  return note;
};

const deleteNote = async (ownerId: string, noteId: string) => {
  const note = await Note.findOneAndDelete({ _id: noteId, owner: ownerId });

  if (!note) {
    throw new AppError(status.NOT_FOUND, "Note not found");
  }

  return note;
};

export const noteServices = {
  createNote,
  listMyNotes,
  updateNote,
  deleteNote,
};