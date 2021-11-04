import mongoose from 'mongoose';
import {CardDocument, AttachmentDocument} from '../../types';

const attachmentSchema = new mongoose.Schema<AttachmentDocument>(
  {
    url: String,
    title: String,
    coverId: String,
  },
  {timestamps: true}
);

const schema = new mongoose.Schema<CardDocument>(
  {
    title: String,
    description: String,
    board_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
    list_id: {type: mongoose.Schema.Types.ObjectId, ref: 'List'},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    coverId: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    labels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Label'}],
    attachments: [attachmentSchema],
  },
  {timestamps: true}
);

schema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: Partial<CardDocument>) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Attachment = mongoose.model('Attachment', attachmentSchema);
export default mongoose.model('Card', schema);
