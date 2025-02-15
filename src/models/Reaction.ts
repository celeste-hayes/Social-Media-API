import Mongoose from 'mongoose';
import { Schema, Document, ObjectId } from 'mongoose';   

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema: Schema<IReaction> = new Mongoose.Schema({
    reactionId: {
        type: Mongoose.Schema.Types.ObjectId,
        default: () => new Mongoose.Types.ObjectId(),
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
        get: (timestamp: Date) => new Date(timestamp),
    },
});

export default reactionSchema;
