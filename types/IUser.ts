import {ObjectId, Document} from 'mongoose';

export interface IUser {
  username: string;
  avatar: string;
  passwordHash: string;
  friends: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  comparePasswords: (password: string) => Promise<boolean>;
}

type Compose<T, K> = T & K;
export type ComposeMongooseModel<T> = Compose<T, Document>;
