import {Date, ObjectId} from 'mongoose';

export interface IComment {
  text: string;
  user: ObjectId;
  parentId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
