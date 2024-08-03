import Card from '@/app/models/Card';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/dbConnect/dbConnect';

// delete card
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'Missing card id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cardToDelete = await Card.findById(id);

    if (!cardToDelete) {
      return new Response(JSON.stringify({ message: 'Card not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the user is the creator of the card
    if (cardToDelete.createdBy.toString() !== session.user.sub) {
      return new Response(JSON.stringify({ message: 'Not authorized to delete this card' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await card.findByIdAndDelete(id);

    return new Response(JSON.stringify({ message: 'Card deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}