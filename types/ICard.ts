import {Document, Date, ObjectId, Model} from 'mongoose';
import {AttachmentDocument} from '.';

export interface ICard {
  title: string;
  description: string;
  boardId: ObjectId;
  listId: ObjectId;
  members: ObjectId[];
  coverId: string;
  comments: ObjectId[];
  labels: ObjectId[];
  attachments: AttachmentDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CardDocument extends ICard, Document {}
export interface CardModel extends Model<CardDocument> {}
