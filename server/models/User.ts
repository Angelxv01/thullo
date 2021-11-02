import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../../utils/config';
import {ComposeMongooseModel, IUser} from '../../types/IUser';

type MongoUser = ComposeMongooseModel<IUser>;
const schema = new mongoose.Schema<MongoUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: String,
    passwordHash: String,
    friends: [this],
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
  async function (this: MongoUser, next: (err?: Error | undefined) => void) {
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
  transform: (_, ret: Partial<MongoUser>) => {
    delete ret._id;
    delete ret.passwordHash;
  },
});

export default mongoose.model('User', schema);
