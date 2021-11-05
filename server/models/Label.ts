import { Schema, Document, model } from 'mongoose';
import {ILabel} from '../../types';

const schema = new Schema<ILabel>(
  {
    text: String,
    color: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    boardId: {type: Schema.Types.ObjectId, ref: 'Board'},
  },
  {timestamps: true}
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<Document<ILabel>>) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default model('Label', schema);
