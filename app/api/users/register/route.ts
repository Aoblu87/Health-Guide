import bcryptjs from "bcryptjs";
import connectionDB from "@/lib/connectionDB";
import User from "@/models/User.js";
import { NextRequest, NextResponse } from "next/server";

// Calls the connect function to establish a connection to the database.
connectionDB();

//Add a new user to the database and hashing the password
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // Parses the request body to extract email
    const { email } = reqBody;

    //Checks if a user with the provided email already exists.
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(reqBody.password, salt);

    //Create a new user
    const newuser = await User.create({
      ...reqBody,
      password: hashedPassword,
    });

    //Create a costant user without password
    const userWithoutPassword = {
      _id: newuser._id,
      firstName: newuser.firstName,
      lastName: newuser.lastName,
      email: newuser.email,
    };

    // Saves the new user to the database.
    await newuser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      userWithoutPassword,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}