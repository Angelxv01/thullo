import mongoose from 'mongoose';
import {BoardDocument} from '../../types';

const schema = new mongoose.Schema<BoardDocument>(
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
        id: {
          type: mongoose.Schema.Types.ObjectId,
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
    delete ret._id;
  },
});

export default mongoose.model('Board', schema);
