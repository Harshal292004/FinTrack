import mongoose from "mongoose";

type TUser = {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    transaction_id: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
};

type TTransaction = {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    transaction_list: { amount: number; date: Date; description?: string }[];
};

export { TUser, TTransaction };
