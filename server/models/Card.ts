import mongoose from 'mongoose';
import {MongoDBReturnObject} from '../../types/MongoDB';

export interface ICard extends mongoose.Document {
  title: string;
  description: string;
  assignedTo: mongoose.ObjectId[];
  coverId: string;
  createdAt: mongoose.Date;
  updatedAt: mongoose.Date;
}

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    coverId: String,
    assignedTo: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
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

export default mongoose.model('Card', schema);
