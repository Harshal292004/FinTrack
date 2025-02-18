import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Transaction } from "@/lib/models/transaction.models";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const { transaction_id } = body;

    if (!transaction_id ) {
      return NextResponse.json(
        { success: false, error: "Transaction id is null" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid transaction_id" },
        { status: 400 }
      );
    }
    const transaction = await Transaction.findOne({ _id: transaction_id });

    if (!transaction) {
      return NextResponse.json(
        {
          success:false,error:"Transaction Not Found!!"
        },
        {status:404}
      )
    }  
    console.log(transaction)   
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
