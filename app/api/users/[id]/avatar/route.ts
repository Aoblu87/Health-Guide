import connectionDB from "@/lib/connectionDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id:string} }
) {
  await connectionDB();

  try {
    const id = params.id;
    const reqBody = await req.json();

    const { avatar } = reqBody;
    if (!avatar) {
      return NextResponse.json({ error: "Url mancante" }, { status: 404 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id, reqBody, {
        new: true,}
  
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Url aggiunto" }, { status: 200 });
  } catch (error: any) {
    console.error("Errore di aggiornamento avatar:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
