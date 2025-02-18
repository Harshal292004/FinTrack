import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/lib/models/user.models";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }
    const newUser = await User.create({ name });
    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
