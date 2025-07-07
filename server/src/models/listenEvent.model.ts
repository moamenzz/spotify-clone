import mongoose from "mongoose";

export interface ListenEventDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  artistId: mongoose.Types.ObjectId;
  songId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const listenEventSchema = new mongoose.Schema<ListenEventDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, required: true },
    songId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const ListenEventModel = mongoose.model<ListenEventDocument>(
  "ListenEvent",
  listenEventSchema
);

export default ListenEventModel;
