import mongoose from "mongoose";
import { PlaybackTypes } from "../constants/playbackTypes";
import { SongDocument } from "./song.model";
import { ArtistDocument } from "./artist.model";

export interface AlbumDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  logo: string;
  title: string;
  artists: ArtistDocument[];
  slug: string;
  songs: SongDocument[]; // Soll es so sein? Oder sollen wir das interface "Song" importieren? Oder vielleicht nur an die ObjektId der Song verweisen?
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

const albumSchema = new mongoose.Schema<AlbumDocument>(
  {
    logo: String,
    title: String,
    slug: String,
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    duration: Number,
  },
  {
    timestamps: true,
  }
);

const AlbumModel = mongoose.model<AlbumDocument>("Album", albumSchema);

export default AlbumModel;
