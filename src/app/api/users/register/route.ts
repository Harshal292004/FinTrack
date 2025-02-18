import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/lib/models/user.models";
import { Transaction } from "@/lib/models/transaction.models";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const { name } = body;

    // validate input
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // create user
    const newUser = await User.create({ name });

    if (!newUser) {
      return NextResponse.json(
        { success: false, error: "Internal Error" },
        { status: 500 }
      );
    }

    // create transaction
    const newTransaction = await Transaction.create({
      userId: newUser._id,
      transaction_list: [],
    });

    if (!newTransaction) {
      return NextResponse.json(
        { success: false, error: "Internal Error" },
        { status: 500 }
      );
    }

    // update User with transactionId
    const updatedUser = await User.findByIdAndUpdate(
      newUser._id, 
      { transactionId: newTransaction._id },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "Failed to update user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, user: updatedUser ,transaction:newTransaction }, { status: 201 });
  } catch (error: any) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
