import mongoose from 'mongoose';
import {MongoDBReturnObject} from '../../types/MongoDB';

export interface IBoard extends mongoose.Document {
  id: mongoose.ObjectId;
  title: string;
  visibility: string;
  description: string;
  lists: mongoose.ObjectId[];
  coverId: string;
  owner: mongoose.ObjectId;
  collaborators: mongoose.ObjectId[];
  createdAt: mongoose.Date;
  updatedAt: mongoose.Date;
}

const schema = new mongoose.Schema(
  {
    title: String,
    visibility: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
      default: 'PUBLIC',
    },
    description: String,
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {timestamps: true}
);

schema.set('toJSON', {
  transform: (_doc, ret: MongoDBReturnObject) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Board', schema);
