import { Types } from "mongoose";
import PlaylistModel from "../models/playlist.model";

export const increaseIndex = async (userId: Types.ObjectId) => {
  // Find existing playlists to determine the next index
  const existingPlaylists = await PlaylistModel.find({ userId });
  let index = 1;
  let title = `New Playlist #${index}`;

  // Keep incrementing index until we find a unique title
  while (existingPlaylists.some((playlist) => playlist.title === title)) {
    index++;
    title = `New Playlist #${index}`;
  }

  return { title };
};
