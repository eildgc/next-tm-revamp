import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  joinLink: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Room || mongoose.model('Room', RoomSchema);