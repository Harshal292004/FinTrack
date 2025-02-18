import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/lib/models/user.models";
import mongoose from "mongoose";
import { Transaction } from "@/lib/models/transaction.models";

export async function DELETE(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }
    //delete user
    const deletedUser = await User.findByIdAndDelete(id);
    
    //delte transactions
    const deletedTransactiion= await Transaction.findByIdAndDelete(deletedUser?.transactionId)

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: `User ${deletedUser.name} deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in deleting user:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
