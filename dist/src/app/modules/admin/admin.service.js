"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../models/user");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const password_1 = require("../../../utils/password");
const note_1 = require("../../../models/note");
const listUsers = async ({ page = 1, limit = 10 }) => {
    const [users, total] = await Promise.all([
        user_1.User.find()
            .select("-passwordHash")
            .skip((page - 1) * limit)
            .limit(limit),
        user_1.User.countDocuments(),
    ]);
    return { data: users, page, total, pages: Math.ceil(total / limit) };
};
const createUser = async (payload) => {
    const existing = await user_1.User.findOne({ email: payload.email });
    if (existing) {
        throw new appError_1.default(http_status_1.default.CONFLICT, "Email already registered");
    }
    const passwordHash = await (0, password_1.hashPassword)(payload.password);
    const user = await user_1.User.create({
        name: payload.name,
        email: payload.email,
        passwordHash,
        role: payload.role ?? "user",
        interests: payload.interests ?? [],
    });
    return user;
};
const updateUser = async (id, payload) => {
    const user = await user_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select("-passwordHash");
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
};
const deleteUser = async (id) => {
    const user = await user_1.User.findByIdAndDelete(id);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
};
const listAllNotes = async ({ page = 1, limit = 10 }) => {
    const [notes, total] = await Promise.all([
        note_1.Note.find()
            .populate("owner", "name email")
            .skip((page - 1) * limit)
            .limit(limit),
        note_1.Note.countDocuments(),
    ]);
    return { data: notes, page, total, pages: Math.ceil(total / limit) };
};
exports.adminServices = {
    listUsers,
    createUser,
    updateUser,
    deleteUser,
    listAllNotes,
};
