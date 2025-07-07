import mongoose from "mongoose";
import { SongDocument } from "./song.model";

export interface ArtistDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  artist: string; // Künstlername
  cover: string;
  bio: string;
  slug: string;
  monthlyListeners: number; // Das sollte Followers bedeuten, wenn ich Spotifys Monthly Listeners logik richtig verstehen. Stell dir aber sicher.
  songs: SongDocument[]; // Soll es so sein? Oder sollen wir das interface "Song" importieren? Oder vielleicht nur an die ObjektId der Song verweisen?
}

const artistSchema = new mongoose.Schema<ArtistDocument>(
  {
    artist: String,
    cover: String,
    bio: String,
    slug: String,
    monthlyListeners: Number,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  {
    timestamps: true,
  }
);

const ArtistModel = mongoose.model<ArtistDocument>("Artist", artistSchema);

export default ArtistModel;
