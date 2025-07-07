import AlbumModel from "../models/album.model";
import SongModel from "../models/song.model";
import { CreateAlbumParams, CreateSongParams } from "../services/admin.service";

export const songSlugGenerator = async (data: CreateSongParams) => {
  // Generate base slug
  let baseSlug = data.title.toLowerCase().replace(/\s+/g, "-");
  let slug = baseSlug;
  let counter = 1;

  // Keep checking until we find a unique slug
  while (await SongModel.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

export const albumSlugGenerator = async (data: CreateAlbumParams) => {
  // Generate base slug
  let baseSlug = data.title.toLowerCase().replace(/\s+/g, "-");
  let slug = baseSlug;
  let counter = 1;

  // Keep checking until we find a unique slug
  while (await AlbumModel.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};
