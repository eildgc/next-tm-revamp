'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function JoinRoom() {
  const [joinLink, setJoinLink] = useState('');
  const { data: session } = useSession();

  const joinRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/rooms/join', { joinLink });
      console.log('Joined room:', response.data.room);
      // Here you can redirect to the joined room or update UI as needed
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  if (!session) return <p>Please sign in to join a room.</p>;

  return (
    <form onSubmit={joinRoom}>
      <input
        type="text"
        value={joinLink}
        onChange={(e) => setJoinLink(e.target.value)}
        placeholder="Enter room join link"
        required
      />
      <button type="submit">Unirse a room</button>
    </form>
  );
}