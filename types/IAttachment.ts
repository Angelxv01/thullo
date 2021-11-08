import { ObjectId } from "mongoose";

export interface IAttachment {
  id: ObjectId;
  url: string;
  title: string;
  coverId: string;
  createdAt: Date;
  updatedAt: Date;
}