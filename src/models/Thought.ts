import { Schema, model, Document } from 'mongoose';
import reactionSchema from './Reaction.js';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: string[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema,
        ],
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
thoughtSchema.set('toJSON', {
    virtuals: true,
});
thoughtSchema.set('toObject', {
    virtuals: true,
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;