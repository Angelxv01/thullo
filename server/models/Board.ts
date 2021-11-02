import mongoose from 'mongoose';
import {IBoard} from '../../types/IBoard';
import {ComposeMongooseModel} from '../../types/Utility';

type MongoBoard = ComposeMongooseModel<IBoard>;
const schema = new mongoose.Schema<MongoBoard>(
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
  transform: (_doc, ret: Partial<MongoBoard>) => {
    delete ret._id;
  },
});

export default mongoose.model('Board', schema);
