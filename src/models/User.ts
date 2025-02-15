import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  applications: string[];
  thoughts: string[];
  friends: ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
  }],
  friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

userSchema.set('toJSON', {
  virtuals: true
});
userSchema.set('toObject', {
  virtuals: true
});



const User = model('user', userSchema);

export default User;
