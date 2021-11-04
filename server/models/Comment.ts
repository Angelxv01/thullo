import mongoose from 'mongoose';
import {CommentDocument} from '../../types';

const schema = new mongoose.Schema<CommentDocument>(
  {
    text: String,
    user: mongoose.Schema.Types.ObjectId,
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
  },
  {timestamps: true}
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<CommentDocument>) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model('Comment', schema);
