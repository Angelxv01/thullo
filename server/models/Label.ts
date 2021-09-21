import mongoose from 'mongoose';
import {MongoDBReturnObject} from '../../types/MongoDB';

export enum Color {
  GREEN,
  YELLOW,
  ORANGE,
  RED,
  BLUE,
  AQUA,
  SAGE,
  GRAY1,
  GRAY2,
  GRAY3,
  GRAY4,
  GRAY5,
}

export interface ILabel extends mongoose.Document {
  text: string;
  color: Color;
  boardId: mongoose.ObjectId;
  createdAt: mongoose.Date;
  updatedAt: mongoose.Date;
}

const schema = new mongoose.Schema(
  {
    text: String,
    color: {
      type: String,
      enum: [
        'GREEN',
        'YELLOW',
        'ORANGE',
        'RED',
        'BLUE',
        'AQUA',
        'SAGE',
        'GRAY1',
        'GRAY2',
        'GRAY3',
        'GRAY4',
        'GRAY5',
      ],
      default: 'GREEN',
    },
    boardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
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

export default mongoose.model('Label', schema);
