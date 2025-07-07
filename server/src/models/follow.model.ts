import mongoose from "mongoose";

export interface FollowDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId; // Follower
  artistId: mongoose.Types.ObjectId; // Followed
  createdAt: Date;
  updatedAt: Date;
}

const followSchema = new mongoose.Schema<FollowDocument>(
  {
    userId: mongoose.Types.ObjectId,
    artistId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const FollowModel = mongoose.model<FollowDocument>("Follow", followSchema);

export default FollowModel;
