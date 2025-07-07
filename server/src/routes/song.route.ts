import express from "express";
import { getSong, getSongs } from "../controllers/song.controller";

const songRouter = express.Router();

songRouter.get("/", getSongs);
songRouter.get("/:songSlug", getSong);

export default songRouter;
