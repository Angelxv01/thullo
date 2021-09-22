import mongoose from 'mongoose';
import {MongoDBReturnObject} from '../../types/MongoDB';

export interface IAttachment extends mongoose.Document {
  url: string;
  abbreviation: string;
  coverId: string;
  createdAt: mongoose.Date;
  updatedAt: mongoose.Date;
}

export interface ICard extends mongoose.Document {
  title: string;
  description: string;
  assignedTo: mongoose.ObjectId[];
  coverId: string;
  comments: mongoose.ObjectId[];
  labels: mongoose.ObjectId[];
  attachments: IAttachment[];
  createdAt: mongoose.Date;
  updatedAt: mongoose.Date;
}

const limit = (obj: unknown[]): boolean => obj.length < 5;

const attachmentSchema = new mongoose.Schema(
  {
    url: String,
    abbreviation: String,
    coverId: String,
  },
  {timestamps: true}
);

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    coverId: String,
    assignedTo: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    labels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Label'}],
    attachments: [
      {
        type: attachmentSchema,
        validate: [limit, '{PATH} exceeds the limit of 5'],
      },
    ],
  },
  {timestamps: true}
);

schema.set('toJSON', {
  transform: (_doc, ret: MongoDBReturnObject) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Attachment = mongoose.model('Attachment', attachmentSchema);
export default mongoose.model('Card', schema);
