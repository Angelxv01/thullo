import {Date, Document, Model, ObjectId} from 'mongoose';

export interface IComment {
  text: string;
  user: ObjectId;
  parentId: ObjectId | null;
  cardId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentDocument extends IComment, Document {}
export type CommentModel = Model<CommentDocument>;
