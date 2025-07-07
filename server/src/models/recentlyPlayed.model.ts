import mongoose from "mongoose";
import { SongDocument } from "./song.model";

export interface RecentlyPlayedDocument {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  songs: SongDocument[];
  playedAt: Date;
}

const recentlyPlayedSchema = new mongoose.Schema<RecentlyPlayedDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    songs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
      { playedAt: { type: Date, required: true } },
    ],
  },
  { timestamps: true }
);

const RecentlyPlayedModel = mongoose.model<RecentlyPlayedDocument>(
  "RecentlyPlayed",
  recentlyPlayedSchema
);

export default RecentlyPlayedModel;
