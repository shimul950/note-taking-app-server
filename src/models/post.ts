
import { Schema, model, Types } from "mongoose";

interface IPost {
  title: string;
  body: string;
  author: Types.ObjectId;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);


postSchema.index({ author: 1 });

export const Post = model<IPost>("Post", postSchema);