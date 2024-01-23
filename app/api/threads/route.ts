import connectionDB from "@/lib/connectionDB";
import Thread from "@/models/Thread";
import { NextRequest, NextResponse } from "next/server";

//Get all threads
export async function GET(request: NextRequest) {
  await connectionDB();
  try {
    const threads = await Thread.find();
    if (!threads) {
      return NextResponse.json({ error: "threads not found" }, { status: 404 });
    }
    return NextResponse.json(threads, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//ADD new trends
export async function POST(request: NextRequest) {
  connectionDB();

  try {
    const reqBody = await request.json();

    //Create a new user
    const newThread = await Thread.create(reqBody);

    // Saves the new user to the database.
    await newThread.save();

    return NextResponse.json(newThread);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




// {
//   "title":"medicine",
//   "user":{
//       "_id":"65b01368ced66ccdc565f4bb"
//   }
// }