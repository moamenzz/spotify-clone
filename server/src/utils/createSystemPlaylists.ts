import { Types } from "mongoose";
import { PlaylistType } from "../constants/playlistTypes";
import PlaylistModel from "../models/playlist.model";
import LibraryModel from "../models/library.model";

export const createSystemPlaylists = async (userId: Types.ObjectId) => {
  // Weidergabelisten
  const likedSongLogo =
    "https://res.cloudinary.com/dddgd6rd5/image/upload/v1744652291/spotify_clone/images/ys1dttipfecbcslym9dn.jpg";

  const onRepeatLogo =
    "https://res.cloudinary.com/dddgd6rd5/image/upload/v1744652522/spotify_clone/images/kolmsq7q3ztyohprsiyx.jpg";

  const likedSongPlaylist = await PlaylistModel.create({
    userId,
    logo: likedSongLogo,
    title: "Liked Songs",
    playlistType: PlaylistType.LIKED_SONGS,
    slug: "liked-songs",
    songs: [],
    description: `Playlist`,
    duration: 0,
  });

  const onRepeatPlaylist = await PlaylistModel.create({
    userId,
    logo: onRepeatLogo,
    title: "On Repeat",
    playlistType: PlaylistType.ON_REPEAT,
    slug: "on-repeat",
    songs: [],
    description: `Playlist`,
    duration: 0,
  });

  // Bibliothek

  const createdLibrary = await LibraryModel.create({
    userId,
    playlists: [likedSongPlaylist._id, onRepeatPlaylist._id],
  });

  return { likedSongPlaylist, onRepeatPlaylist, createdLibrary };
};
