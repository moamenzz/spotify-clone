import SongModel from "../models/song.model";
import catchErrors from "../utils/catchError";

export const getSongs = catchErrors(async (req, res) => {
  const songs = await SongModel.find().populate(
    "artists",
    "artist cover bio slug monthlyListeners songs"
  );

  res.status(200).json(songs);
});

export const getSong = catchErrors(async (req, res) => {
  const songSlug = req.params.songSlug;

  const song = await SongModel.findOne({ slug: songSlug }).populate(
    "artists",
    "artist cover bio slug monthlyListeners songs"
  );

  res.status(200).json(song);
});
