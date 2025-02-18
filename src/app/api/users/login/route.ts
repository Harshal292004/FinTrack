import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/lib/models/user.models";
import { Transaction } from "@/lib/models/transaction.models";
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
    const user = await User.findOne({ name });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    const user_id= user._id
    const transaction= await Transaction.findOne({userId:user_id})
    if(!transaction){
        return NextResponse.json(
            {success:false,error:"Transaction not found"},
            {status:404}
        )
    }
    return NextResponse.json({ success: true, user,transaction }, { status: 200 });
  
} catch (error: any) {
    console.error("Error in user login:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
