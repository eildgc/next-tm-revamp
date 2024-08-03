import User from "@/app/models/User";
import dbConnect from "@/dbConnect/dbConnect";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/lib/sendEmail";

export async function POST(req = NextRequest) {
  try {
    await dbConnect();

    const reqBody = await req.json();
    const { name, password, email } = reqBody;

    if (!name || !password || !email) {
      return NextResponse.json(
        { error: "Name, password or email are missing" },
        { status: 500 }
      );
    }

    const isUserExist = await User.findOne({ email });
    console.log("isUserExist", isUserExist);

    if (isUserExist) {
      return NextResponse.json(
        { error: "Account already registered. Try login" },
        { status: 500 }
      );
    }
    // generate salt
    const salt = await bcryptjs.genSalt(10);
    // convert password to hashed password
    const hashedPassword = await bcryptjs.hash(password, salt);
    // store to the database

    const newUser = await new User({ name, email, password: hashedPassword, active: false }).save();
    console.log(newUser);

      // SEND EMAIL TO USER
    sendEmail({ emailAddress: email, emailType: "emailValidation", userId: newUser?._id });
    
    return NextResponse.json({ success: true, message: "User created successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
