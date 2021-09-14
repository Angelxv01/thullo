import mongoose from 'mongoose';
import {MongoDBReturnObject} from '../../types/MongoDB';

const schema = new mongoose.Schema({
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
});

schema.set('toJSON', {
  transform: (_doc, ret: MongoDBReturnObject) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Board', schema);
