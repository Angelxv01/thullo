import {ObjectId, Date} from 'mongoose';

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
