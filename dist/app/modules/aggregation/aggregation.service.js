"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregationServices = void 0;
// aggregation.service.ts
const mongoose_1 = require("mongoose");
const user_1 = require("../../../models/user");
const groupUsersByInterests = async () => {
    return user_1.User.aggregate([
        { $unwind: "$interests" },
        {
            $group: {
                _id: "$interests",
                users: { $push: { id: "$_id", name: "$name", email: "$email" } },
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
    ]);
};
const getUserPosts = async (userId) => {
    return user_1.User.aggregate([
        { $match: { _id: new mongoose_1.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "author",
                as: "posts",
            },
        },
        { $project: { name: 1, email: 1, posts: 1 } },
    ]);
};
exports.aggregationServices = {
    groupUsersByInterests,
    getUserPosts,
};
