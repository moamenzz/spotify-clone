import AlbumModel from "../models/album.model";
import catchErrors from "../utils/catchError";

export const getAlbums = catchErrors(async (req, res) => {
  const albums = await AlbumModel.find()
    .populate({
      path: "songs",
      populate: [
        {
          path: "artists", // Populiere die Artists im Song
          model: "Artist",
        },
        {
          path: "artistsRoles.artist", // Populiere die artist-Referenz innerhalb der artistsRoles
          model: "Artist",
        },
      ],
    })
    .populate("artists");

  res.status(200).json(albums);
});

export const getAlbum = catchErrors(async (req, res) => {
  const albumSlug = req.params.albumSlug;

  const album = await AlbumModel.findOne({ slug: albumSlug }).populate("songs");

  res.status(200).json(album);
});
