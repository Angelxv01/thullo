import {Document, ObjectId, Date, Model} from 'mongoose';

export interface IUser {
  username: string;
  avatar?: string;
  passwordHash: string;
  friends: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends IUser, Document {
  comparePasswords(password: string): Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {}
