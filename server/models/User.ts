import { Schema, model, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';
import { SALT_ROUND } from '../utils/config';
import { UserDocument, UserModel } from '../types';

const schema = new Schema<UserDocument, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: String,
    phone: String,
    email: String,
    avatar: String,
    passwordHash: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

schema.methods.comparePasswords = async function (
  this: UserDocument,
  password: string
) {
  return bcrypt.compare(password, this.passwordHash);
};

schema.pre<UserDocument>('save', async function (next: () => void) {
  if (this.isNew || this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(
      this.passwordHash,
      Number(SALT_ROUND)
    );
  }
  next();
});

schema.set('toJSON', {
  versionKey: false,
  transform: (_, ret: Partial<UserDocument>) => {
    ret.id = ret._id as ObjectId;
    delete ret._id;
    delete ret.passwordHash;
  },
});

export default model<UserDocument, UserModel>('User', schema);
