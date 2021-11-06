import {Schema, Document, model} from 'mongoose';

const schema = new Schema(
  {
    text: String,
    user: Schema.Types.ObjectId,
    parentId: {type: Schema.Types.ObjectId, ref: 'Comment'},
  },
  {timestamps: true}
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default model('Comment', schema);
