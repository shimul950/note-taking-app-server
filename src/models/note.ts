
import { Schema, model, Types } from "mongoose";

interface INote {
  title: string;
  content: string;
  owner: Types.ObjectId;
}

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

noteSchema.index({ owner: 1, createdAt: -1 });

export const Note = model<INote>("Note", noteSchema);