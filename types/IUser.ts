import {ObjectId} from 'mongoose';

export interface IUser {
  username: string;
  avatar: string;
  passwordHash: string;
  friends: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  comparePasswords: (password: string) => Promise<boolean>;
}
