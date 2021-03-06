import {
  Document, ObjectId, Date, Model,
} from 'mongoose';

export enum Visibility {
  PRIVATE,
  PUBLIC,
}

export enum Role {
  OWNER,
  ADMIN,
  MEMBER,
}

export interface Member {
  id: ObjectId;
  role: Role;
}

export interface IBoard {
  title: string;
  visibility: Visibility;
  description: string;
  coverId: string;
  members: Member[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardDocument extends IBoard, Document {}
export type BoardModel = Model<BoardDocument>;
