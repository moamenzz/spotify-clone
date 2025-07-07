import mongoose from "mongoose";
import { ArtistDocument } from "./artist.model";
import { PlaylistDocument } from "./playlist.model";

// Hier ist das "Song" interface, dem ich dazu verweisen.

// export interface Song {
//   id: string;
//   cover: string;
//   title: string;
//   slug: string;
//   artists: ArtistDocument[]; // Soll es so sein? Oder sollen wir das interface "Artist" importieren? Oder vielleicht nur an die ObjektId der Song verweisen?
//   dateAdded: Date;
//   duration: number;
//   url: string;
//   explicit?: boolean;
//   plays: number;
// }

export interface LibraryDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  artists: ArtistDocument[]; // Soll es so sein?
  playlists: PlaylistDocument[]; // Soll es so sein?
}

const librarySchema = new mongoose.Schema<LibraryDocument>(
  {
    userId: mongoose.Types.ObjectId,
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }], // Liked Songs soll standardmaßig erstellt werden. Sollen wir es hier beschrieben oder bei einem Kontroller?
  },
  {
    timestamps: true,
  }
);

const LibraryModel = mongoose.model<LibraryDocument>("Library", librarySchema);

export default LibraryModel;
