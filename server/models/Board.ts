import {Schema, model} from 'mongoose';
import { BoardDocument, BoardModel } from '../../types/';

const schema = new Schema<BoardDocument, BoardModel>(
  {
    title: String,
    visibility: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    description: String,
    coverId: String,
    members: [
      {
        _id: false,
        id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: Number,
          enum: [0, 1, 2],
          default: 2,
        },
      },
    ],
  },
  {timestamps: true}
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<BoardDocument>) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default model<BoardDocument, BoardModel>('Board', schema);
