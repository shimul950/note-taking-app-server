"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const admin_service_1 = require("./admin.service");
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponce_1 = require("../../shared/sendResponce");
const listUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await admin_service_1.adminServices.listUsers({ page, limit });
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await admin_service_1.adminServices.createUser(req.body);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "User created successfully",
        data: user,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await admin_service_1.adminServices.updateUser(req.params.id, req.body);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User updated successfully",
        data: user,
    });
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await admin_service_1.adminServices.deleteUser(req.params.id);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User deleted successfully",
        data: null,
    });
});
const listAllNotes = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await admin_service_1.adminServices.listAllNotes({ page, limit });
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Notes retrieved successfully",
        data: result,
    });
});
exports.adminControllers = {
    listUsers,
    createUser,
    updateUser,
    deleteUser,
    listAllNotes,
};
