import mongoose from 'mongoose';
import {MongoDBReturnObject} from '../../types/MongoDB';

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
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
