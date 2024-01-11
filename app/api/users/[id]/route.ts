import connectionDB from "@/lib/connectionDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

//Route for modifying a user
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
    const updateUser = await User.findByIdAndUpdate(id, reqBody, {
      new: true,
    }).select("-password");

    if (!updateUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updateUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reqBody = await request.json();
    const id = params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } else {
      return NextResponse.json({ message: "User deleted" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
