import mongoose from "mongoose";
import { PlaybackTypes } from "../constants/playbackTypes";
import { ArtistRoles } from "../constants/artistRoleTypes";
import { ArtistDocument } from "./artist.model";
import { SongGenreTypes } from "../constants/songGenreType";

export interface SongDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  logo: string;
  title: string;
  slug: string; // Soll Kleinbuchstaben sein mit "_" als Leerzeichen benutzt. Soll auch Nummer zugefügt werden, ob es gibt eine andere Song mit dem gleichen Namen
  url: string;
  album?: mongoose.Types.ObjectId[];
  genre: SongGenreTypes[];
  artists: ArtistDocument[]; // Soll es so sein? Oder sollen wir das interface "Artist" importieren? Oder vielleicht nur an die ObjektId des Song verweisen?
  artistsRoles: {
    _id: mongoose.Types.ObjectId;
    artist: mongoose.Types.ObjectId | ArtistDocument;
    role: ArtistRoles;
  }[];
  duration: number;
  explicit: boolean;
  plays: number; // Bestimmt, ob die Song beliebt ist oder nicht
  featured: boolean;
}

const songSchema = new mongoose.Schema<SongDocument>(
  {
    logo: String,
    title: String,
    slug: String,
    url: String,
    album: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    artistsRoles: [
      {
        artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
        role: { type: String, enum: Object.values(ArtistRoles) },
      },
    ],
    genre: [String],
    duration: Number,
    explicit: Boolean,
    plays: Number,
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SongModel = mongoose.model<SongDocument>("Song", songSchema);

export default SongModel;
