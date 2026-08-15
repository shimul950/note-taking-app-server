"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteServices = void 0;
;
const http_status_1 = __importDefault(require("http-status"));
const note_1 = require("../../../models/note");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const createNote = async (ownerId, payload) => {
    const note = await note_1.Note.create({
        title: payload.title,
        content: payload.content,
        owner: ownerId,
    });
    return note;
};
const listMyNotes = async (ownerId, { page = 1, limit = 10 }) => {
    const [notes, total] = await Promise.all([
        note_1.Note.find({ owner: ownerId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        note_1.Note.countDocuments({ owner: ownerId }),
    ]);
    return { data: notes, page, total, pages: Math.ceil(total / limit) };
};
const updateNote = async (ownerId, noteId, payload) => {
    const note = await note_1.Note.findOneAndUpdate({ _id: noteId, owner: ownerId }, payload, { new: true, runValidators: true });
    if (!note) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Note not found");
    }
    return note;
};
const deleteNote = async (ownerId, noteId) => {
    const note = await note_1.Note.findOneAndDelete({ _id: noteId, owner: ownerId });
    if (!note) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Note not found");
    }
    return note;
};
exports.noteServices = {
    createNote,
    listMyNotes,
    updateNote,
    deleteNote,
};
