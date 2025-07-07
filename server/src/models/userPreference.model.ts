import mongoose from "mongoose";

export interface UserPreferenceDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  songId: mongoose.Types.ObjectId;
  playCount: number;
  liked: boolean; // Explizite "Gefällt mir"-Bewertung
  excluded: boolean; // "Aus Geschmacksprofil ausschließen"
  lastPlayed: Date;
}

const userPreferenceSchema = new mongoose.Schema<UserPreferenceDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
    playCount: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    excluded: { type: Boolean, default: false },
    lastPlayed: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Index für schnellere Abfragen
userPreferenceSchema.index({ userId: 1, songId: 1 }, { unique: true });

const UserPreferenceModel = mongoose.model<UserPreferenceDocument>(
  "UserPreference", 
  userPreferenceSchema
);

export default UserPreferenceModel;