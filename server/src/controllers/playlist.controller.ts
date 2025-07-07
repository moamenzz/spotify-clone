import PlaylistModel from "../models/playlist.model";
import catchErrors from "../utils/catchError";

export const getPlaylist = catchErrors(async (req, res) => {
  const playlistSlug = req.params.playlistSlug;

  const playlist = await PlaylistModel.findOne({ slug: playlistSlug }).populate(
    "songs"
  );

  res.status(200).json(playlist);
});
