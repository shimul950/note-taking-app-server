"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const note_service_1 = require("./note.service");
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponce_1 = require("../../shared/sendResponce");
const createNote = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const note = await note_service_1.noteServices.createNote(req.user.id, req.body);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "Note created successfully",
        data: note,
    });
});
const listMyNotes = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await note_service_1.noteServices.listMyNotes(req.user.id, { page, limit });
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Notes retrieved successfully",
        data: result,
    });
});
const updateNote = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const note = await note_service_1.noteServices.updateNote(req.user.id, req.params.id, req.body);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Note updated successfully",
        data: note,
    });
});
const deleteNote = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await note_service_1.noteServices.deleteNote(req.user.id, req.params.id);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Note deleted successfully",
        data: null,
    });
});
exports.noteControllers = {
    createNote,
    listMyNotes,
    updateNote,
    deleteNote,
};
