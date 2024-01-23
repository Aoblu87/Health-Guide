
import connectionDB from "@/lib/connectionDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


//Get all thread by user ID
export async function GET(request: NextRequest,{params}:{params:{id:string}}){
  await connectionDB();
  try {
    const id= params.id;
    const userThread = await User.findById({ _id: id }).populate("threads").select("threads");
    if (!userThread) {
      return NextResponse.json({ error: "UserThread not found" }, { status: 404 });
    }
    return NextResponse.json(userThread, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    
  }
  
  }
