import mongoose from 'mongoose';
import {ILabel} from '../../types/ILabel';
import {ComposeMongooseModel} from '../../types/Utility';

type MongoLabel = ComposeMongooseModel<ILabel>;

const schema = new mongoose.Schema<MongoLabel>(
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
  transform: (_doc, ret: Partial<MongoLabel>) => {
    delete ret._id;
  },
});

export default mongoose.model('Label', schema);
