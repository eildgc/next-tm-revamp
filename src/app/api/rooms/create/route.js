
import Room from '@/app/models/Room';
import dbConnect from '@/dbConnect/dbConnect';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { name } = body;
    const joinLink = uuidv4(); // Generate a unique join link

    const room = new Room({
      name,
      creator: session.user.id,
      joinLink,
    });

    await room.save();

    return new Response(JSON.stringify({ room }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}