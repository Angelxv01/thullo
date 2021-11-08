import {Schema, model} from 'mongoose';
import { ListDocument, ListModel } from '../../types';

const schema = new Schema<ListDocument, ListModel>({
  name: String,
  board_id: {
    type: Schema.Types.ObjectId,
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

export default model<ListDocument, ListModel>('List', schema);
