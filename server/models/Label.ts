import mongoose from 'mongoose';
import {LabelDocument} from '../../types';

const schema = new mongoose.Schema<LabelDocument>(
  {
    text: String,
    color: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    boardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
  },
  {timestamps: true}
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<LabelDocument>) => {
    delete ret._id;
  },
});

export default mongoose.model('Label', schema);
