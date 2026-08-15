

import { Post } from "../../../models/post";
import { ICreatePostPayload } from "./post.interface";

const createPost = async (authorId: string, payload: ICreatePostPayload) => {
  const post = await Post.create({
    title: payload.title,
    body: payload.body,
    author: authorId,
  });

  return post;
};

export const postServices = {
  createPost,
};