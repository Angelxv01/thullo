import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../../utils/config';
import {MongoDBReturnObject} from '../../types/MongoDB';

interface UserReturn extends MongoDBReturnObject {
  passwordHash?: String;
}

export interface IUser extends mongoose.Document {
  id: string;
  username: string;
  passwordHash: string;
  boards: mongoose.Schema.Types.ObjectId[];
  comparePasswords: (password: string) => Promise<boolean>;
}

const schema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: String,
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    },
  ],
});

schema.pre(
  'save',
  async function (this: IUser, next: (err?: Error | undefined) => void) {
    if (this.isNew || !this.isModified('passwordHash')) {
      this.passwordHash = await bcrypt.hash(
        this.passwordHash,
        Number(config.SALT_ROUND)
      );
    }
    next();
  }
);

schema.methods.comparePasswords = async function (
  this: IUser,
  password: string
) {
  return bcrypt.compare(password, this.passwordHash);
};

schema.set('toJSON', {
  transform: (_doc, ret: UserReturn) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

export default mongoose.model('User', schema);
