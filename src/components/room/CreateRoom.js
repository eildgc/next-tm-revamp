'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const { data: session } = useSession();

  const createRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/rooms/create', { name: roomName });
      console.log('Room created:', response.data.room);
      // Here you can redirect to the new room or update UI as needed
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  if (!session) return <p>Please sign in to create a room.</p>;

  return (
    <form onSubmit={createRoom}>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter room name"
        required
      />
      <button type="submit">Create Room</button>
    </form>
  );
}