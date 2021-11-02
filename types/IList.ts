import {ObjectId} from 'mongoose';

export interface IList {
  name: string;
  board_id: ObjectId;
  order: number;
}
