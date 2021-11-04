import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../../utils/config';
import {IUser, UserDocument} from '../../types';

const schema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: String,
    passwordHash: String,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  },
  {timestamps: true}
);

schema.methods.comparePasswords = async function (
  this: IUser,
  password: string
) {
  return bcrypt.compare(password, this.passwordHash);
};

schema.pre(
  'save',
  async function (this: UserDocument, next: (err?: Error | undefined) => void) {
    if (this.isNew || this.isModified('passwordHash')) {
      this.passwordHash = await bcrypt.hash(
        this.passwordHash,
        Number(config.SALT_ROUND)
      );
    }
    next();
  }
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_, ret: Partial<UserDocument>) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.passwordHash;
  },
});

export default mongoose.model('User', schema);
