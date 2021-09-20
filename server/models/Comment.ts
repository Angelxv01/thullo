import mongoose from 'mongoose';
import {MongoDBReturnObject} from '../../types/MongoDB';

export interface IComment extends mongoose.Document {
  text: string;
  user: mongoose.ObjectId;
  parentId: mongoose.ObjectId;
  createdAt: mongoose.Date;
  updatedAt: mongoose.Date;
}

const schema = new mongoose.Schema(
  {
    text: String,
    user: mongoose.Schema.Types.ObjectId,
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
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

export default mongoose.model('Comment', schema);
