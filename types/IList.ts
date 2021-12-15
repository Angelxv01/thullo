import { Document, Model, ObjectId } from 'mongoose';

export interface IList {
  name: string;
  boardId: ObjectId;
}

export interface ListDocument extends IList, Document {}
export interface ListModel extends Model<ListDocument> {}
