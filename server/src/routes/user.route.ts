import express from "express";
import {
  createPlaylist,
  getUser,
  getUserLibrary,
  handleAddToPlaylist,
  handleFollowArtist,
  handleLikeSong,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/library", getUserLibrary);
userRouter.post("/create-playlist", createPlaylist);
userRouter.put("/like-song", handleLikeSong);
userRouter.put("/follow-artist/:artistSlug", handleFollowArtist);
userRouter.put("/add-to-playlist", handleAddToPlaylist);

export default userRouter;
