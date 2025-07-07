import { Types } from "mongoose";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import { PlaylistType } from "../constants/playlistTypes";
import PlaylistModel from "../models/playlist.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { increaseIndex } from "../utils/increaseIndex";
import SongModel from "../models/song.model";
import ArtistModel from "../models/artist.model";
import FollowModel from "../models/follow.model";
import LibraryModel from "../models/library.model";

export const customPlaylist = async (userId: Types.ObjectId) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const { title } = await increaseIndex(userId);

  const logo =
    "https://www.beatstars.com/assets/img/placeholders/playlist-placeholder.svg";

  const newPlaylist = await PlaylistModel.create({
    userId,
    logo,
    title,
    playlistType: PlaylistType.USER_CREATED,
    slug: title.toLowerCase().replace(/ /g, "-"),
    description: `Playlist · ${user.username}`,
    songs: [],
    duration: 0,
  });

  // Add Playlist to library

  await LibraryModel.findOneAndUpdate(
    { userId },
    { $push: { playlists: newPlaylist._id } },
    { upsert: true }
  );

  return { newPlaylist };
};

export const likeUnlikeSong = async (
  userId: Types.ObjectId,
  songId: Types.ObjectId
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const song = await SongModel.findById(songId);
  appAssert(song, NOT_FOUND, "Song not found");

  // Modify user preference

  // Add to liked songs playlist
  const likedSongPlaylist = await PlaylistModel.findOne({
    userId,
    playlistType: PlaylistType.LIKED_SONGS,
  });
  if (likedSongPlaylist?.songs.includes(song)) {
    await likedSongPlaylist.updateOne({ $pull: { songs: song } });
  } else {
    await likedSongPlaylist?.updateOne({ $push: { songs: song } });
  }
};

export const followUnfollowArtist = async (
  userId: Types.ObjectId,
  artistSlug: string
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const artist = await ArtistModel.findOne({ slug: artistSlug });
  appAssert(artist, NOT_FOUND, "Artist not found");

  const isFollowing = await FollowModel.findOne({
    userId,
    artistId: artist._id,
  });

  if (isFollowing) {
    await isFollowing.deleteOne();
  } else {
    await FollowModel.create({ userId, artistId: artist._id });
  }

  // Modify User Preference\
};

export const addToPlaylist = async (
  userId: Types.ObjectId,
  songId: Types.ObjectId,
  playlistId: Types.ObjectId
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const song = await SongModel.findById(songId);
  appAssert(song, NOT_FOUND, "Song not found");

  const selectedPlaylist = await PlaylistModel.findOne({
    _id: playlistId,
    userId,
    playlistType: PlaylistType.USER_CREATED,
  });

  if (selectedPlaylist?.songs.includes(song)) {
    return;
  } else {
    selectedPlaylist?.songs.push(song);
    await selectedPlaylist?.save();
  }
};
