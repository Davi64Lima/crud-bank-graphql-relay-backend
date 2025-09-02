import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
