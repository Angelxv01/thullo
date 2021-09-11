import mongoose from 'mongoose';
import {MongoDBReturnObject} from '../../types/MongoDB';

const schema = new mongoose.Schema({
  name: String,
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
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

export default mongoose.model('List', schema);
