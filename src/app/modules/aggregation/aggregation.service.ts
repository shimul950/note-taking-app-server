// aggregation.service.ts
import { Types } from "mongoose";
import { User } from "../../../models/user";


const groupUsersByInterests = async () => {
  return User.aggregate([
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

const getUserPosts = async (userId: string) => {
  return User.aggregate([
    { $match: { _id: new Types.ObjectId(userId) } },
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

export const aggregationServices = {
  groupUsersByInterests,
  getUserPosts,
};