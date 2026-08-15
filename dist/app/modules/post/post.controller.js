"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const post_service_1 = require("./post.service");
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponce_1 = require("../../shared/sendResponce");
const createPost = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const post = await post_service_1.postServices.createPost(req.user.id, req.body);
    (0, sendResponce_1.sendResponce)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "Post created successfully",
        data: post,
    });
});
exports.postControllers = {
    createPost,
};
