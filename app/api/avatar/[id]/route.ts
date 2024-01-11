
import {uploads} from "@/lib/cluodinary"
import connectionDB from "@/lib/connectionDB";
import uploadFile from "@/lib/uploadFile";
import User from "@/models/User";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { id: string } }
) {
  await connectionDB();
  const id = params.id;
 
  uploadFile.single("avatar")
 
const reqBody = await req.json();
const user = await User.findByIdAndUpdate(id);
    const file = reqBody.file;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

      // Update the user with the file information
      return NextResponse.json(user, { status: 200 });
    
  }
