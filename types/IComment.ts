import {Date, ObjectId} from 'mongoose';

export interface IComment {
  id: ObjectId;
  text: string;
  user: ObjectId;
  parentId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
