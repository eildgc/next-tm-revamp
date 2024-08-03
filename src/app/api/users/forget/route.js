import User from "@/app/models/User";
import dbConnect from "@/dbConnect/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/lib/sendEmail";

export async function POST(req = NextRequest) {
  try {
    await dbConnect();

    const reqBody = await req.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json({ error: "Email is missing" }, { status: 500 });
    }

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    }

    // SEND EMAIL TO USER
    sendEmail({
      emailAddress: email,
      emailType: "forgotPassword",
      userId: isUserExist?._id,
    });

    return NextResponse.json({
      success: true,
      message: "Email validation sent successfuly",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
