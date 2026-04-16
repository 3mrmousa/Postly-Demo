import { Document, Schema } from "mongoose";
import mongoose from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  cover?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
    cover: String,
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
