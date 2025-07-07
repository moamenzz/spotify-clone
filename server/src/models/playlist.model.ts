import mongoose from "mongoose";
import { SongDocument } from "./song.model";
import { PlaylistType } from "../constants/playlistTypes";

export interface PlaylistDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  logo: string;
  title: string;
  playlistType: PlaylistType;
  slug: string;
  description?: string;
  songs: SongDocument[];
  duration: number;
}

const playlistSchema = new mongoose.Schema<PlaylistDocument>(
  {
    userId: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    logo: String,
    title: String,
    playlistType: {
      type: String,
      enum: Object.values(PlaylistType),
      default: PlaylistType.USER_CREATED,
    },
    slug: String,
    description: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    duration: Number,
  },
  {
    timestamps: true,
  }
);

const PlaylistModel = mongoose.model<PlaylistDocument>(
  "Playlist",
  playlistSchema
);

export default PlaylistModel;
