// app/api/users/route.ts
import { NextResponse } from "next/server";
import { User } from "@/lib/models/user.models";
import { connectToDB } from "@/lib/db";
export async function POST(request: Request) {
  try {
    await connectToDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.email_address || !body.username) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    

    const newUser = await User.create({
      username:body.username,
      email_address: body.email_address,
      first_name: body.first_name,
    });
    

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}