import { Schema, Document, model } from 'mongoose';

const schema = new Schema(
  {
    text: String,
    color: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    boardId: {type: Schema.Types.ObjectId, ref: 'Board'},
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

export default model('Label', schema);
