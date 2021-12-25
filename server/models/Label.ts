import { Schema, model, ObjectId } from 'mongoose';
import { LabelDocument, LabelModel } from '../types';

const schema = new Schema<LabelDocument, LabelModel>(
  {
    text: String,
    color: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  },
  { timestamps: true }
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<LabelDocument>) => {
    ret.id = ret._id as ObjectId;
    delete ret._id;
  },
});

export default model<LabelDocument, LabelModel>('Label', schema);
