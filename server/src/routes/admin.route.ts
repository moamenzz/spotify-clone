import express from "express";
import {
  handleCreateAlbum,
  handleCreateSong,
} from "../controllers/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/create-song", handleCreateSong);
adminRouter.post("/create-album", handleCreateAlbum);

export default adminRouter;
