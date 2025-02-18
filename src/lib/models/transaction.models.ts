import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransactionEntry {
  amount: number;
  date: Date;
  description?: string;
}

export interface ITransaction extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  transaction_list: ITransactionEntry[];
}

const TransactionEntrySchema = new Schema<ITransactionEntry>(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
  },
  { _id: false }
);

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    transaction_list: { type: [TransactionEntrySchema], default: [] },
  },
  { timestamps: true }
);

export const Transaction: Model<ITransaction> =
  (mongoose.models.Transaction as Model<ITransaction>) ||
  mongoose.model<ITransaction>("Transaction", transactionSchema);
