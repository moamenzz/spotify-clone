import express from "express";
import { getAlbum, getAlbums } from "../controllers/album.controller";

const albumRouter = express.Router();

albumRouter.get("/", getAlbums);
albumRouter.get("/:albumSlug", getAlbum);

export default albumRouter;
