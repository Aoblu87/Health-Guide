import connectionDB from "@/lib/connectionDB";
import Thread from "@/models/Thread";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

//Get all threads by user ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectionDB();

  try {
    const id = params.id;

    // Assicurati che il modello 'User' sia correttamente collegato ai 'Thread'
    const user = await User.findById({ _id: id });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const threads = await Thread.find({ "user": id });
    if (!threads) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }
    return NextResponse.json(threads, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user's threads:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
