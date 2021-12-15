import {
  ObjectId, Date, Document, Model,
} from 'mongoose';

export interface ILabel {
  text: string;
  color: Color;
  boardId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum Color {
  GREEN1,
  YELLOW,
  ORANGE,
  RED,
  BLUE1,
  BLUE3,
  GREEN3,
  GRAY1,
  GRAY2,
  GRAY3,
  GRAY4,
  GRAY5,
}

export interface LabelDocument extends ILabel, Document {}
export type LabelModel = Model<LabelDocument>;
