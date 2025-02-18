import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Transaction } from "@/lib/models/transaction.models";
import mongoose from "mongoose";

export async function DELETE(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const { transaction_id, index } = body;
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
    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) {
      return NextResponse.json(
        { success: false, error: "Transaction document not found" },
        { status: 404 }
      );
    }
    if (index < 0 || index >= transaction.transaction_list.length) {
      return NextResponse.json(
        { success: false, error: "Invalid transaction index" },
        { status: 400 }
      );
    }
    transaction.transaction_list.splice(index, 1);
    await transaction.save();
    return NextResponse.json(
      { success: true, transaction: transaction },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in deleting transaction:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
