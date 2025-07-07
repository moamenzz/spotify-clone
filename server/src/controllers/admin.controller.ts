import { albumSchema, songSchema } from "../schemas/song.schema";
import { createAlbum, createSong } from "../services/admin.service";
import catchErrors from "../utils/catchError";

export const handleCreateSong = catchErrors(async (req, res) => {
  const data = songSchema.parse(req.body);
  const userId = req.userId;

  const { newSong } = await createSong(data, userId);

  res.status(200).json(newSong);
});

export const handleCreateAlbum = catchErrors(async (req, res) => {
  const data = albumSchema.parse(req.body);
  const userid = req.userId;

  const { newAlbum } = await createAlbum(data, userid);

  res.status(200).json(newAlbum);
});
