import User from "@/app/models/User";
import dbConnect from "@/dbConnect/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export async function GET(req = NextRequest) {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;
    const existCursor = searchParams?.get("cursor");
    const limit = searchParams?.get("limit");

    console.log("existCursor", existCursor);
    console.log("limit", limit);

    /// http://localhost:3000/api/users/list?cursor=0&limit=10

    let cursor = existCursor && existCursor !== '0' ? existCursor : null;
    let query;

    if (cursor && mongoose.Types.ObjectId.isValid(cursor)) {
      query = User.find({
        _id: {
          $lt: mongoose.Types.ObjectId.createFromHexString(cursor),
        },
      }).sort({ _id: -1 }).limit(parseInt(limit));
    } else {
      query = User.find().sort({ _id: -1 }).limit(parseInt(limit));
    }


    const result = await query.exec();
    const lastItem = result.length === parseInt(limit) ? result[result.length - 1] : null;
    const nextCursor = lastItem ? (lastItem?._id).toString : null; 

    return NextResponse.json({
      success: true,
      message: "Success", 
      users: result, nextCursor: nextCursor
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
