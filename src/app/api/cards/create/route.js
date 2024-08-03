import Card from '@/app/models/Card';
import dbConnect from '@/dbConnect/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
//create card
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
    const { title, content } = body;

    if (!title || !content) {
      return new Response(JSON.stringify({ message: 'Title and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const card = new Card({
      title,
      content,
      createdBy: session.user.sub,
    });

    await card.save();

    return new Response(JSON.stringify({ card }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message, error: error.toString() }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}