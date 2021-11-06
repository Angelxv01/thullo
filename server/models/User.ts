import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../../utils/config';

const schema = new Schema(
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
  this: any,
  password: string
) {
  return bcrypt.compare(password, this.passwordHash);
};

schema.pre(
  'save',
  async function (next: (err?: Error | undefined) => void) {
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
  transform: (_, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.passwordHash;
  },
});

export default model('User', schema);
