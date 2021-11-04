import mongoose from 'mongoose';
import {ListDocument} from '../../types';

const schema = new mongoose.Schema<ListDocument>({
  name: String,
  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  },
  order: Number,
});

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<ListDocument>) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model('List', schema);
