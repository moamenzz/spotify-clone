import express from "express";
import { getArtist, getArtists } from "../controllers/artist.controller";

const artistRouter = express.Router();

artistRouter.get("/", getArtists);
artistRouter.get("/:artistSlug", getArtist);

export default artistRouter;
