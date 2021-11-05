import {Schema, Document, model} from 'mongoose';
import {IList} from '../../types';

const schema = new Schema<IList>({
  name: String,
  board_id: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
  },
  order: Number,
});

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<Document<IList>>) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default model('List', schema);
