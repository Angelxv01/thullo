import {Document, Model, ObjectId} from 'mongoose';

export interface IList {
  name: string;
  board_id: ObjectId;
  order: number;
}

export interface ListDocument extends IList, Document {};
export interface ListModel extends Model<ListDocument> {};
