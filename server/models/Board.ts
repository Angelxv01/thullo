import mongoose, {Document, Schema, model} from 'mongoose';

const schema = new Schema(
  {
    title: String,
    visibility: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    description: String,
    coverId: String,
    members: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: Number,
          enum: [0, 1, 2],
          default: 2,
        },
      },
    ],
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

export default model('Board', schema);
