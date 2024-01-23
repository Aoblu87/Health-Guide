import connectionDB from "@/lib/connectionDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Thread from "@/models/Thread";


//Get thread by id
export async function GET(request: NextRequest,{params}:{params:{id:string}}){
    await connectionDB();
    try {
      const id= params.id;
      const thread = await Thread.findById({ _id: id })
      if (!thread) {
        return NextResponse.json({ error: "thread not found" }, { status: 404 });
      }
      return NextResponse.json(thread, { status: 200 });
    } catch (error:any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
      
    }
    
    }
    //Route for modifying thread
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    await connectionDB();
    try {
      const reqBody = await request.json();
      //Takes parameters from the URL
      const id = params.id;
      //Find the user in the database based on the user ID
      const updateThread = await Thread.findByIdAndUpdate(id, reqBody, {
        new: true,
      });
  
      if (!updateThread) {
        return NextResponse.json({ error: "Thread not found" }, { status: 404 });
      }
      return NextResponse.json(updateThread, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    await connectionDB();
    try {
      const id = params.id;
      const deleteThread = await Thread.findByIdAndDelete(id);
      if (!deleteThread) {
        return NextResponse.json({ error: "Thread not found" }, { status: 404 });
      } else {
        return NextResponse.json({ message: "Thread deleted" });
      }
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }