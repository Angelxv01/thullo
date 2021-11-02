import mongoose from 'mongoose';
import {IAttachment, ICard} from '../../types/ICard';
import {ComposeMongooseModel} from '../../types/Utility';

type MongoCard = ComposeMongooseModel<ICard>;
type MongoAttachment = ComposeMongooseModel<IAttachment>;

const attachmentSchema = new mongoose.Schema<MongoAttachment>(
  {
    url: String,
    title: String,
    coverId: String,
  },
  {timestamps: true}
);

const schema = new mongoose.Schema<ICard>(
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
  transform: (_doc, ret: Partial<MongoCard>) => {
    delete ret._id;
  },
});

export const Attachment = mongoose.model('Attachment', attachmentSchema);
export default mongoose.model('Card', schema);
