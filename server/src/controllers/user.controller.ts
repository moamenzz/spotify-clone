import { NOT_FOUND } from "../constants/HttpStatusCode";
import LibraryModel from "../models/library.model";
import UserModel from "../models/user.model";
import {
  addToPlaylist,
  customPlaylist,
  followUnfollowArtist,
  likeUnlikeSong,
} from "../services/user.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getUser = catchErrors(async (req, res) => {
  const userId = req.userId;
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  res.status(200).json(user.omitPassword());
});

export const getUserLibrary = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const library = await LibraryModel.findOne({ userId })
    .populate("artists", "artist cover bio slug monthlyListeners")
    .populate("playlists", "title logo slug description")
    .sort({ createdAt: -1 });
  appAssert(library, NOT_FOUND, "Library not found");

  res.status(200).json(library);
});

export const createPlaylist = catchErrors(async (req, res) => {
  const userId = req.userId;

  const { newPlaylist } = await customPlaylist(userId);

  res.status(201).json(newPlaylist);
});

export const handleLikeSong = catchErrors(async (req, res) => {
  const userId = req.userId;
  const songId = req.body.songId;

  await likeUnlikeSong(userId, songId);

  return res.status(200);
});

export const handleFollowArtist = catchErrors(async (req, res) => {
  const userId = req.userId;
  const artistSlug = req.params.artistSlug;

  await followUnfollowArtist(userId, artistSlug);

  res.status(200).json({ message: "Follow status updated successfully" });
});

export const handleAddToPlaylist = catchErrors(async (req, res) => {
  const userId = req.userId;
  const playlistId = req.body.playlistId;
  const songId = req.body.songId;

  await addToPlaylist(userId, songId, playlistId);

  res
    .status(200)
    .json({ message: "Add To Playlist status updated successfully" });
});
