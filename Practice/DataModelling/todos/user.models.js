import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'], // can also give custom messages
      min: [6, 'password must be greater than 6'],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
