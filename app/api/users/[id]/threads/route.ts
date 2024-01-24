
// import connectionDB from "@/lib/connectionDB";
// import User from "@/models/User";
// import mongoose from "mongoose";
// import { NextRequest, NextResponse } from "next/server";

// //Get all thread by user ID
// export async function GET(request: NextRequest,{params}:{params:{id:string}}){
//   await connectionDB();
//   try {
//     if (!mongoose.models.threads) {
//       console.error("Model 'threads' not registered");
//       return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
//     const id= params.id;
//     const userThread = await User.findById({ _id: id }).populate("threads").select("threads");
//     if (!userThread) {
//       return NextResponse.json({ error: "UserThread not found" }, { status: 404 });
//     }
//     return NextResponse.json(userThread, { status: 200 });
//   } catch (error:any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
    
//   }
  
//   }
import connectionDB from "@/lib/connectionDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

//Get all threads by user ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectionDB();

  try {
    const userId = params.id;

    // Assicurati che il modello 'User' sia correttamente collegato ai 'Thread'
    const userWithThreads = await User.findById(userId).populate("threads");

    if (!userWithThreads) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userWithThreads.threads, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user's threads:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

