import {ObjectId, Date} from 'mongoose';

export interface ILabel {
  text: string;
  color: Color;
  boardId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum Color {
  GREEN,
  YELLOW,
  ORANGE,
  RED,
  BLUE,
  AQUA,
  SAGE,
  GRAY1,
  GRAY2,
  GRAY3,
  GRAY4,
  GRAY5,
}
