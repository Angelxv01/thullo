import {Document, Model} from 'mongoose';

export interface IAttachment {
  url: string;
  title: string;
  coverId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttachmentDocument extends IAttachment, Document {}
export type AttachmentModel = Model<AttachmentDocument>;
