import { Document, Model, ObjectId } from "mongoose";

export interface IAttachment {
  title: string;
  coverId: string;
  cardId: ObjectId;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttachmentDocument extends IAttachment, Document {}
export type AttachmentModel = Model<AttachmentDocument>;
