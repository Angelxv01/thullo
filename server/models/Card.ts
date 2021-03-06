import { Schema, model, ObjectId } from "mongoose";
import {
  AttachmentDocument,
  AttachmentModel,
  CardDocument,
  CardModel,
} from "../types";

const attachmentSchema = new Schema<AttachmentDocument, AttachmentModel>(
  {
    title: String,
    coverId: String,
    cardId: { type: Schema.Types.ObjectId, ref: "Card" },
    filename: String,
  },
  { timestamps: true }
);

attachmentSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: Partial<AttachmentDocument>) => {
    ret.id = ret._id as ObjectId;
    delete ret._id;
  },
});

const schema = new Schema<CardDocument, CardModel>(
  {
    title: String,
    description: String,
    boardId: { type: Schema.Types.ObjectId, ref: "Board" },
    listId: { type: Schema.Types.ObjectId, ref: "List" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    coverId: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    labels: [{ type: Schema.Types.ObjectId, ref: "Label" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

schema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: Partial<CardDocument>) => {
    ret.id = ret._id as ObjectId;
    delete ret._id;
  },
});

export const Attachment = model<AttachmentDocument, AttachmentModel>(
  "Attachment",
  attachmentSchema
);
export default model<CardDocument, CardModel>("Card", schema);
