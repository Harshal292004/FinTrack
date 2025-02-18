import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  transactionId?: mongoose.Schema.Types.ObjectId;
  name: string;
}

const userSchema = new Schema<IUser>(
  {
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);
