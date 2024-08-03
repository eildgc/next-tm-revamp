import Card from '@/app/models/card';
import dbConnect from "@/dbConnect/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from '../../auth/[...nextauth]/route';

// get card
export async function GET(req) {
  const session = await getServerSession(authOptions);
  console.log("User ID in get:", session.user.sub);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const totalCards = await Card.countDocuments();
    const totalPages = Math.ceil(totalCards / limit);

    const cards = await Card.find()
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({
        cards,
        currentPage: page,
        totalPages,
        totalCards,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
