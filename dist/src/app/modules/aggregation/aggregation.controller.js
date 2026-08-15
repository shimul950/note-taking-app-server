"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregationControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const aggregation_service_1 = require("./aggregation.service");
const sendResponce_1 = require("../../shared/sendResponce");
const catchAsync_1 = require("../../shared/catchAsync");
const groupUsersByInterests = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await aggregation_service_1.aggregationServices.groupUsersByInterests();
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Users grouped by interests",
        data: result,
    });
});
const getUserPosts = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await aggregation_service_1.aggregationServices.getUserPosts(req.params.userId);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User posts retrieved successfully",
        data: result,
    });
});
exports.aggregationControllers = {
    groupUsersByInterests,
    getUserPosts,
};
