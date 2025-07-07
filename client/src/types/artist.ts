import { Song } from "./songs";

export interface Artist {
  _id: string;
  artist: string;
  cover: string;
  bio: string;
  monthlyListeners: number;
  songs: Song[];
  slug: string;
}

export interface ArtistRoles {
  _id: string;
  artist: {
    _id: string;
    artist: string;
    slug: string;
    cover: string; // Beachte, dass dies im Model 'cover' heißt, nicht 'logo'
    bio: string;
    monthlyListeners: number;
  };
  role: "Main Artist" | "Featured Artist" | "Producer" | "Writer" | "Composer";
}

export interface ArtistPick {
  id: number;
  title: string;
  cover: string;
  comment: string;
  slug: string;
  type: "Single" | "Album";
}

export interface FeaturedOnPlaylists {
  id: number;
  title?: string;
  cover: string;
  slug: string;
  bioOrArtists: string | string[];
  type: "Playlist" | "Single" | "Album" | "Episode";
}

export interface FansAlsoLike {
  id: number;
  title: string;
  cover: string;
  slug: string;
  dateAdded: Date;
  type: "Playlist" | "Single" | "Album" | "Episode";
}

export interface FansAlsoLikeProps {
  id: number;
  cover: string;
  title: string;
  slug: string;
  type: "Artist";
}
