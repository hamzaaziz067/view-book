import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import PassportLocal from 'passport-local-mongoose';

const SocialSchema = new Schema({
  platform: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
const EduSchema = new Schema({
  institute: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  continue: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema(
  {
    full_name: {
      type: String,
      default: '',
    },
    dp: {
      type: String,
    },
    cover: {
      type: String,
    },
    view: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
    },
    relationship: {
      type: String,
    },
    gender: {
      type: String,
    },
    social: [SocialSchema],
    education: [EduSchema],
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(PassportLocal);

const User = mongoose.model('User', UserSchema);
export default User;