import { Document, Date, ObjectId, Model } from 'mongoose';

export interface ICard {
  title: string;
  description: string;
  boardId: ObjectId;
  listId: ObjectId;
  members: ObjectId[];
  coverId: string;
  comments: ObjectId[];
  labels: ObjectId[];
  author: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardDocument extends ICard, Document {}
export type CardModel = Model<CardDocument>;
