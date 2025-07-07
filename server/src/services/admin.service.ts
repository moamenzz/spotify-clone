import { Types } from "mongoose";
import UserModel from "../models/user.model";
import { FORBIDDEN, NOT_FOUND } from "../constants/HttpStatusCode";
import appAssert from "../utils/AppAssert";
import AppErrorCode from "../constants/AppErrorCode";
import SongModel, { SongDocument } from "../models/song.model";
import { albumSlugGenerator, songSlugGenerator } from "../utils/slugGenerator";
import cloudinary from "../config/cloudinary";
import AlbumModel from "../models/album.model";
import cloudinaryOptions from "../utils/cloudinaryOptions";
import FollowModel from "../models/follow.model";

interface MainElements {
  logo: string;
  title: string;
  artists: string[]; // Geändert von ArtistDocument[] zu string[] (ObjectId als String)
  duration: number;
}

export interface CreateSongParams extends MainElements {
  url: string;
  artistsRoles: Array<{
    artist: string; // ObjectId als String
    role:
      | "Main Artist"
      | "Featured Artist"
      | "Producer"
      | "Writer"
      | "Composer";
  }>;
  genre: string[]; // Geändert von SongGenreTypes[] zu string[]
  explicit?: boolean; // Optional gemacht
  plays: number;
}

export interface CreateAlbumParams extends MainElements {
  songs: string[];
}

export const createSong = async (
  data: CreateSongParams,
  userId: Types.ObjectId
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const adminId = "67d857ce53805dc4539fceb0";

  const isAdmin = await UserModel.findById(adminId);
  appAssert(isAdmin, FORBIDDEN, "Unauthorized", AppErrorCode.NOTADMIN);

  const slug = await songSlugGenerator(data);

  // Upload to Cloudinary

  let audioFileURL;

  const audioFile = await cloudinary.uploader.upload(data.url, {
    folder: "spotify_clone/audio",
    resource_type: "auto", // Wichtig für Audio-Dateien
  });
  audioFileURL = audioFile.secure_url;
  appAssert(audioFileURL, NOT_FOUND, "Audio file not found");

  let logoFileURL;

  const logoFile = await cloudinary.uploader.upload(data.logo, {
    ...cloudinaryOptions,
    resource_type: "image",
  });
  logoFileURL = logoFile.secure_url;
  appAssert(logoFileURL, NOT_FOUND, "Logo file not found");

  //TODO: Create Song in Database

  const newSong = await SongModel.create({
    logo: logoFileURL,
    title: data.title,
    slug,
    url: audioFileURL,
    artists: data.artists,
    artistsRoles: data.artistsRoles,
    genre: data.genre,
    duration: data.duration,
    explicit: data.explicit,
    plays: data.plays,
  });

  // Send Notifications to Followers

  // const artistId = newSong.artists.map((artist) => artist._id);

  // const followers = await FollowModel.find({artistId, });

  return { newSong };
};

export const createAlbum = async (
  data: CreateAlbumParams,
  userId: Types.ObjectId
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const adminId = "67d857ce53805dc4539fceb0";

  const isAdmin = await UserModel.findById(adminId);
  appAssert(isAdmin, FORBIDDEN, "Unauthorized", AppErrorCode.NOTADMIN);

  const slug = await albumSlugGenerator(data);

  const songs = await SongModel.find({
    _id: { $in: data.songs },
  });

  appAssert(
    songs.length === data.songs.length,
    NOT_FOUND,
    "Some songs were not found"
  );

  let logoFileURL;

  const logoFile = await cloudinary.uploader.upload(data.logo, {
    ...cloudinaryOptions,
    resource_type: "image",
  });
  logoFileURL = logoFile.secure_url;
  appAssert(logoFile, NOT_FOUND, "Logo file not found");

  // Create Album in Database

  const newAlbum = await AlbumModel.create({
    logo: logoFileURL,
    title: data.title,
    slug,
    artists: data.artists,
    songs: songs,
    duration: data.duration,
  });

  // Create Notification For Followers

  return { newAlbum };
};
