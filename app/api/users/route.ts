import bcryptjs from "bcryptjs";
import connectionDB from "@/lib/connectionDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// Calls the connect function to establish a connection to the database.
connectionDB();


//Get all users from the database
export async function GET() {
  try {
    const users = await User.find({}).select("-password");
    if (!users) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}