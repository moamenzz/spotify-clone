import mongoose from "mongoose";
import { PlaybackTypes } from "../constants/playbackTypes";

export interface NotificationDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  cover: string;
  title: string;
  artists: string[];
  notificationType: PlaybackTypes;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new mongoose.Schema<NotificationDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    cover: { type: String, required: true },
    title: { type: String, required: true },
    artists: { type: [String], required: true },
    notificationType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = mongoose.model<NotificationDocument>(
  "Notification",
  NotificationSchema
);

export default NotificationModel;
