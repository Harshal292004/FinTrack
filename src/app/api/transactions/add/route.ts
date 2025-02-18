import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Transaction } from "@/lib/models/transaction.models";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const { transaction_id, amount, date, description } = body;
    if (!transaction_id || amount === undefined || !date || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid user_id" },
        { status: 400 }
      );
    }
    let transaction = await Transaction.findOne({ _id: transaction_id });
    const transactionEntry = { amount, date, description };
    if (!transaction) {
      return NextResponse.json(
        {
          success:false,error:"Transaction Not Found!!"
        },
        {status:404}
      )
    }  

    transaction.transaction_list.push(transactionEntry);
    await transaction.save();
 
    return NextResponse.json(
      { success: true, transaction: transaction },
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
