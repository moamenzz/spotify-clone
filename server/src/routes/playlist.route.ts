import express from "express";
import { getPlaylist } from "../controllers/playlist.controller";

const playlistRouter = express.Router();

playlistRouter.get("/:playlistSlug", getPlaylist);

export default playlistRouter;
