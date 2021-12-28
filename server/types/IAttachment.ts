import { Document, Model, ObjectId } from "mongoose";

export interface IAttachment {
  title: string;
  coverId: string;
  cardId: ObjectId;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttachmentDocument extends IAttachment, Document {}
export type AttachmentModel = Model<AttachmentDocument>;
