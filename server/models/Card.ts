import {Schema, Document, model} from 'mongoose';

const attachmentSchema = new Schema(
  {
    url: String,
    title: String,
    coverId: String,
  },
  {timestamps: true}
);

const schema = new Schema(
  {
    title: String,
    description: String,
    board_id: {type: Schema.Types.ObjectId, ref: 'Board'},
    list_id: {type: Schema.Types.ObjectId, ref: 'List'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    coverId: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    labels: [{type: Schema.Types.ObjectId, ref: 'Label'}],
    attachments: [attachmentSchema],
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

export const Attachment = model('Attachment', attachmentSchema);
export default model('Card', schema);
