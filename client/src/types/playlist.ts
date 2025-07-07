import { Song } from "./songs";

export type PlaylistValue =
  | "For-you"
  | "Trending Albums/Singles"
  | "Your top mixes"
  | "Recently played"
  | "Best of artists"
  | "Episodes for you"
  | "Jump back in"
  | "Artist"
  | "Playlist"
  | "Album"
  | "Single";

export interface PlaylistProps {
  _id: string;
  userId: string;
  logo: string;
  title: string;
  playlistType: PlaylistValue | string;
  slug: string;
  description: string;
  songs: Song[];
  duration: number;
  createdAt: Date;
}

export interface MediaBase {
  id: string;
  type: PlaylistValue;
}

export interface BasePlaylistItem extends MediaBase {
  title: string;
  songs?: Song[];
  slug?: string;
  description?: string;
  logo: string;
}

export interface ForYouPlaylistItems extends BasePlaylistItem {
  artists: string[];
}

export interface TrendingPlaylistItems extends BasePlaylistItem {
  title: string;
  playlistType: "Album" | "Single" | "EP";
}

export interface RecentlyPlayedPlaylistItems extends BasePlaylistItem {
  title: string;
  playlistType: "Artist" | "Playlist";
}

export interface JumpBackInPlaylistitems extends BasePlaylistItem {
  title: string;
  artist?: string[];
  dateAndTime?: string;
  playlistType: "Artist" | "Single" | "Playlist" | "Podcast" | "Episode";
}

export interface YourTopMixesPlaylistItems extends BasePlaylistItem {
  artists: string[];
  mixType: "Pop" | "Artist" | "R&B" | "Romantic" | "Rap";
}

export interface EpisodesForYouPlaylistItems extends BasePlaylistItem {
  title: string;
  dateAndTime: string;
}

export interface BestOfArtistsPlaylistItems extends BasePlaylistItem {
  title: string;
}

interface PlaylistDataProps {
  forYou: ForYouPlaylistItems[];
  trending: TrendingPlaylistItems[];
  recentlyPlayed: RecentlyPlayedPlaylistItems[];
  topMixes: YourTopMixesPlaylistItems[];
  jumpBackIn: JumpBackInPlaylistitems[];
  episodesForYou: EpisodesForYouPlaylistItems[];
  bestOfArtists: BestOfArtistsPlaylistItems[];
}

export type PlaylistItem =
  | ForYouPlaylistItems
  | TrendingPlaylistItems
  | RecentlyPlayedPlaylistItems
  | JumpBackInPlaylistitems
  | YourTopMixesPlaylistItems
  | EpisodesForYouPlaylistItems
  | BestOfArtistsPlaylistItems;

export const playlistData: PlaylistDataProps = {
  forYou: [
    // TODO: Implement Discover Weekly here & Release Radar
    {
      id: "1",
      type: "For-you",
      title: "Daily Mix 1",
      logo: "/daily-mix-1.jpg",
      artists: ["Metro Boomin", "Fetty wap", "Lil Uzi Vert"],
    },
    {
      id: "2",
      type: "For-you",
      title: "Daily Mix 2",
      logo: "/daily-mix-2.jpg",
      artists: ["Eminem", "Drake", "Post Malone"],
    },
    {
      id: "3",
      type: "For-you",
      title: "Daily Mix 3",
      logo: "/daily-mix-3.jpg",
      artists: ["Eminem", "Drake", "Post Malone"],
    },
    {
      id: "4",
      type: "For-you",
      title: "Daily Mix 4",
      logo: "/daily-mix-4.jpg",
      artists: ["Post Malone", "Eminem", "Travis Scott"],
    },
    {
      id: "5",
      type: "For-you",
      title: "Daily Mix 5",
      logo: "/daily-mix-5.jpg",
      artists: ["Drake", "Kendrick Lamar", "Travis Scott"],
    },
    {
      id: "6",
      type: "For-you",
      title: "Daily Mix 6",
      logo: "/daily-mix-6.jpg",
      artists: ["J. Cole", "Kendrick Lamar", "Travis Scott"],
    },
  ],
  trending: [
    {
      id: "1",
      type: "Trending Albums/Singles",
      logo: "/limi-the-best.jpg",
      title: "The Best I Ever Had",
      playlistType: "Album",
    },
    {
      id: "2",
      type: "Trending Albums/Singles",
      logo: "/6.44-mellina.jpg",
      title: "6:44",
      playlistType: "Album",
    },
    {
      id: "3",
      type: "Trending Albums/Singles",
      logo: "/dua-lipa.png",
      title: "Dua Lipa",
      playlistType: "Album",
    },
    {
      id: "4",
      type: "Trending Albums/Singles",
      logo: "/future-nostalgia-lipa.png",
      title: "Future Nostalgia",
      playlistType: "Album",
    },
    {
      id: "5",
      type: "Trending Albums/Singles",
      logo: "/bury-say-my-name.jpg",
      title: "Say my name",
      playlistType: "Single",
    },
    {
      id: "6",
      type: "Trending Albums/Singles",
      logo: "/eros.jpg",
      title: "eros",
      playlistType: "Single",
    },
  ],
  recentlyPlayed: [
    {
      id: "1",
      logo: "/on-repeat.jpg",
      title: "On Repeat",
      playlistType: "Playlist",
      type: "Recently played",
    },
    {
      id: "2",
      logo: "/liked-songs.jpg",
      title: "Liked Songs",
      playlistType: "Playlist",
      type: "Recently played",
    },
    {
      id: "3",
      logo: "/limi.jpg",
      title: "Limi",
      playlistType: "Artist",
      type: "Recently played",
    },
    {
      id: "4",
      logo: "/zandros.jpg",
      title: "zandros",
      playlistType: "Artist",
      type: "Recently played",
    },
    {
      id: "5",
      logo: "/shehab-cover-img.png",
      title: "Shehab",
      playlistType: "Artist",
      type: "Recently played",
    },
  ],
  jumpBackIn: [
    {
      id: "1",
      logo: "bury.jpg",
      title: "BURY",
      playlistType: "Artist",
      type: "Jump back in",
    },
    {
      id: "2",
      logo: "mellina.jpg",
      title: "Mellina Tey",
      playlistType: "Artist",
      type: "Jump back in",
    },
    {
      id: "3",
      logo: "al-blushi.jpg",
      title: "Hazza Al Blushi",
      playlistType: "Artist",
      type: "Jump back in",
    },
    {
      id: "4",
      logo: "merazmen.png",
      title: "Merazmen",
      artist: ["Shehab"],
      playlistType: "Single",
      type: "Jump back in",
    },
    {
      id: "5",
      logo: "daily-mix-3.jpg",
      title: "Daily Mix 3",
      artist: ["Eminem", "Drake", "Post Malone"],
      playlistType: "Playlist",
      type: "Jump back in",
    },
    {
      id: "6",
      logo: "huberman-lab-essentials.jpg",
      title: "Huberman Lab Essentials",
      playlistType: "Podcast",
      type: "Jump back in",
    },
    {
      id: "7",
      logo: "easy-german-episode.jpg",
      title: "560: Geburtstag im Krankenhaus",
      dateAndTime: "Today · 24 min 16 sec",
      playlistType: "Episode",
      type: "Jump back in",
    },
  ],
  topMixes: [
    {
      id: "1",
      logo: "limi.jpg",
      title: "Limi Mix",
      mixType: "Artist",
      artists: ["Limi", "zandros", "Mellina Tey"],
      type: "Your top mixes",
    },
    {
      id: "2",
      logo: "bieber.jpg",
      title: "Pop Mix",
      mixType: "Pop",
      artists: ["Justin Bieber", "Christina Aguilera", "Doja Cat"],
      type: "Your top mixes",
    },
  ],
  episodesForYou: [
    {
      id: "1",
      logo: "easy-german-episode.jpg",
      title: "560: Geburtstag im Krankenhaus",
      dateAndTime: "Today · 24 min 16 sec",
      type: "Episodes for you",
    },
  ],
  bestOfArtists: [
    {
      id: "1",
      logo: "this-is-doja-cat.jpg",
      title: "This is Doja Cat. The essential tracks, all in one playlist.",
      type: "Best of artists",
    },
    {
      id: "2",
      logo: "this-is-dua-lipa.jpg",
      title: "This is Dua Lipa. The essential tracks, all in one playlist.",
      type: "Best of artists",
    },
    {
      id: "3",
      logo: "this-is-eminem.jpg",
      title: "This is Eminem. The essential tracks, all in one playlist.",
      type: "Best of artists",
    },
    {
      id: "4",
      logo: "this-is-rihanna.jpg",
      title: "This is Rihanna. The essential tracks, all in one playlist.",
      type: "Best of artists",
    },
  ],
};
