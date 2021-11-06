import {Schema, Document, model} from 'mongoose';

const schema = new Schema({
  name: String,
  board_id: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
  },
  order: Number,
});

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default model('List', schema);
