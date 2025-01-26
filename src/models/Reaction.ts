import { Schema, Types, model } from 'mongoose';

const dateFormat = (timestamp: Date) => {
  return timestamp.toLocaleString();
};

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false, 
  }
);

const Reaction = model('Reaction', reactionSchema);

export default Reaction;
