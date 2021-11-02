import mongoose from 'mongoose';
import {IComment} from '../../types/IComment';
import {ComposeMongooseModel} from '../../types/Utility';

type MongoComment = ComposeMongooseModel<IComment>;

const schema = new mongoose.Schema<MongoComment>(
  {
    text: String,
    user: mongoose.Schema.Types.ObjectId,
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
  },
  {timestamps: true}
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<MongoComment>) => {
    delete ret._id;
  },
});

export default mongoose.model('Comment', schema);
