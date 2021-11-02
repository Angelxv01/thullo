import {Date, ObjectId} from 'mongoose';

export interface IAttachment {
  id: ObjectId;
  url: string;
  title: string;
  coverId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICard {
  id: ObjectId;
  title: string;
  description: string;
  board_id: ObjectId;
  list_id: ObjectId;
  members: ObjectId[];
  coverId: string;
  comments: ObjectId[];
  labels: ObjectId[];
  attachments: IAttachment[];
  createdAt: Date;
  updatedAt: Date;
}
