import {Date, Document, Model, ObjectId} from 'mongoose';

export interface IComment {
  text: string;
  user: ObjectId;
  parentId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentDocument extends IComment, Document {}
export interface CommentModel extends Model<CommentDocument> {}
