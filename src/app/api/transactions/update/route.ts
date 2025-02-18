import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Transaction } from "@/lib/models/transaction.models";
import mongoose from "mongoose";

export async function PUT(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const { transaction_id, index, amount, date, description } = body;
    if (!transaction_id || index === undefined) {
      return NextResponse.json(
        { success: false, error: "transaction_id and index are required" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid transaction_id" },
        { status: 400 }
      );
    }
    const transactionDoc = await Transaction.findById(transaction_id);
    if (!transactionDoc) {
      return NextResponse.json(
        { success: false, error: "Transaction document not found" },
        { status: 404 }
      );
    }
    if (index < 0 || index >= transactionDoc.transaction_list.length) {
      return NextResponse.json(
        { success: false, error: "Invalid transaction index" },
        { status: 400 }
      );
    }
    // Update provided fields
    if (amount !== undefined) transactionDoc.transaction_list[index].amount = amount;
    if (date) transactionDoc.transaction_list[index].date = date;
    if (description) transactionDoc.transaction_list[index].description = description;
    await transactionDoc.save();
    return NextResponse.json(
      { success: true, transaction: transactionDoc },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in updating transaction:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
