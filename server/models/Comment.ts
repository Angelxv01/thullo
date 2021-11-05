import {Schema, Document, model} from 'mongoose';
import {IComment} from '../../types';

const schema = new Schema<IComment>(
  {
    text: String,
    user: Schema.Types.ObjectId,
    parentId: {type: Schema.Types.ObjectId, ref: 'Comment'},
  },
  {timestamps: true}
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<Document<IComment>>) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default model('Comment', schema);
