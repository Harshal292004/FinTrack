import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Transaction } from "@/lib/models/transaction.models";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const { user_id, amount, date, description } = body;
    if (!user_id || amount === undefined || !date || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid user_id" },
        { status: 400 }
      );
    }
    let transactionDoc = await Transaction.findOne({ userId: user_id });
    const transactionEntry = { amount, date, description };
    if (transactionDoc) {
      transactionDoc.transaction_list.push(transactionEntry);
      await transactionDoc.save();
    } else {
      transactionDoc = await Transaction.create({
        userId: user_id,
        transaction_list: [transactionEntry],
      });
    }
    return NextResponse.json(
      { success: true, transaction: transactionDoc },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in adding transaction:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
