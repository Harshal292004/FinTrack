import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/lib/models/user.models";
import mongoose from "mongoose";

export async function PUT(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();

    const { id, name } = body;
    
    if (!id || !name) {
      return NextResponse.json(
        { success: false, error: "ID and name are required" },
        { status: 400 }
      );
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: any) {
    console.error("Error in updating user:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
