// pages/api/rooms/join.js

import dbConnect from "@/dbConnect/dbConnect";
import Room from "@/app/models/Room";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from 'next-auth';


export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { joinLink } = body;
    const room = await Room.findOne({ joinLink });

    if (!room) {
      return new Response(JSON.stringify({ message: "Room not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!room.participants.includes(session.user.id)) {
      room.participants.push(session.user.id);
      await room.save();
    }

    return new Response(JSON.stringify({ room }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
