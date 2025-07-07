import { NOT_FOUND } from "../constants/HttpStatusCode";
import ArtistModel from "../models/artist.model";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getArtists = catchErrors(async (req, res) => {
  const artists = await ArtistModel.find();

  res.status(200).json(artists);
});

export const getArtist = catchErrors(async (req, res) => {
  const artistSlug = req.params.artistSlug;

  const artist = await ArtistModel.findOne({ slug: artistSlug }).populate({
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
  });
  appAssert(artist, NOT_FOUND, "Artist not found");

  res.status(200).json(artist);
});
