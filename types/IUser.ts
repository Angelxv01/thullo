import {ObjectId, Date} from 'mongoose';

export interface IUser {
  id: ObjectId;
  username: string;
  avatar: string;
  passwordHash: string;
  friends: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  comparePasswords: (password: string) => Promise<boolean>;
}
