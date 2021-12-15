import { Schema, model, ObjectId } from 'mongoose';
import { CommentDocument, CommentModel } from '../../types';

const schema = new Schema<CommentDocument, CommentModel>(
  {
    text: String,
    user: Schema.Types.ObjectId,
    cardId: Schema.Types.ObjectId,
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: true }
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<CommentDocument>) => {
    ret.id = ret._id as ObjectId;
    delete ret._id;
  },
});

export default model<CommentDocument, CommentModel>('Comment', schema);
