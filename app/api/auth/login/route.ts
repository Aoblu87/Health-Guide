import connectionDB from "@/lib/connectionDB.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server.js";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  //Connect to server
  await connectionDB();
  try {
    //Looking for the body of the request
    const reqBody = await request.json();
    // Parses the request body to extract email and password
    const { email, password } = reqBody;

    //Check if the user already exists by checking the email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    //Check if the password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) { 
      return NextResponse.json({ error: "Invalid password" }, { status: 404 });
    } else {
      //Create a payload object with the id of the user
      const payload = { id: user._id };

      //Create token with the payload object and the JWT Secret that expires after 1 hour
      const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: "1h",
      });

      // Create a JSON response indicating successful login
      const response = NextResponse.json(
        { message: "Login successfull" },
        { status: 200 }
      );

      // const response = NextResponse.json({
      //   message: "Login successful",
      //   success: true,
      //   payload: payload,
      //   token: token,
      // });

      // Set the token as an HTTP-only cookie
      response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 48 * 60 * 60,

      });
      response.cookies.set({
        name: "userId",
        value: user._id,
        httpOnly: true,
        maxAge: 48 * 60 * 60,
      });
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
