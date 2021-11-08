import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import {SALT_ROUND} from '../../utils/config';
import { UserDocument, UserModel } from '../../types';

const schema = new Schema<UserDocument, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: String,
    passwordHash: String,
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  },
  {timestamps: true}
);

schema.methods.comparePasswords = async function (
  this: UserDocument,
  password: string
) {
  return bcrypt.compare(password, this.passwordHash);
};

schema.pre<UserDocument>(
  'save',
  async function (next: (err?: Error | undefined) => void) {
    if (this.isNew || this.isModified('passwordHash')) {
      this.passwordHash = await bcrypt.hash(
        this.passwordHash,
        SALT_ROUND
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

export default model('User', schema);
