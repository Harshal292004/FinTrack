import mongoose from "mongoose";

interface IUser  {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  transaction_id: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

interface ITransaction {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  transaction_list: { amount: number; date: Date; description?: string }[];
};
interface INavbarProps {
  bodyRef: React.RefObject<HTMLBodyElement | null>;
}

export { IUser, ITransaction, INavbarProps };
