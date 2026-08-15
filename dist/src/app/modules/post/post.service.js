"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const post_1 = require("../../../models/post");
const createPost = async (authorId, payload) => {
    const post = await post_1.Post.create({
        title: payload.title,
        body: payload.body,
        author: authorId,
    });
    return post;
};
exports.postServices = {
    createPost,
};
