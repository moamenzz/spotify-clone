import { z } from "zod";
import { PlaybackTypes } from "../constants/playbackTypes";
import { ArtistRoles } from "../constants/artistRoleTypes";
import { SongGenreTypes } from "../constants/songGenreType";

const MAX_FILE_SIZE = 15000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const mainElementsSchema = z.object({
  logo: z.string({ required_error: "Cover is required" }),
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title cannot exceed 30 characters"),
  artists: z.array(z.string()).min(1, "At least one artist is required"),
  duration: z.number().min(0),
});

export const albumSchema = mainElementsSchema.extend({
  songs: z.array(z.string()).min(1, "At least one song is required"),
});

export const songSchema = mainElementsSchema.extend({
  url: z
    .string({ required_error: "url is required" })
    .min(6, "url must be at least 6 characters")
    .max(300, "url cannot exceed 300   characters"),
  artistsRoles: z
    .array(
      z.object({
        artist: z.string(),
        role: z.enum([
          ArtistRoles.MainArtist,
          ArtistRoles.FeaturedArtist,
          ArtistRoles.Producer,
          ArtistRoles.Writer,
          ArtistRoles.Composer,
        ]),
      })
    )
    .min(1, "At least one artist role is required"),
  genre: z
    .array(
      z.enum([
        SongGenreTypes.COUNTRY,
        SongGenreTypes.ROCK,
        SongGenreTypes.POP,
        SongGenreTypes.RHYTHMANDBLUES,
        SongGenreTypes.HIPHOP,
        SongGenreTypes.ELECTRONIC,
        SongGenreTypes.SOUL,
      ])
    )
    .length(1, "Please select at least one genre"),
  explicit: z.boolean().optional(),
  plays: z.number().min(0),
});

// songs: z
//     .array(
//       z.object({
//         logo: z.string({ required_error: "Cover is required" }),
//         title: z
//           .string({ required_error: "Title is required" })
//           .min(6, "Title must be at least 6 characters")
//           .max(30, "Title cannot exceed 30 characters"),
//         url: z
//           .string({ required_error: "url is required" })
//           .min(6, "url must be at least 6 characters")
//           .max(100, "url cannot exceed 100 characters"),
//         artistsRoles: z
//           .array(
//             z.object({
//               artist: z.string(),
//               role: z.enum([
//                 ArtistRoles.MainArtist,
//                 ArtistRoles.FeaturedArtist,
//                 ArtistRoles.Producer,
//                 ArtistRoles.Writer,
//                 ArtistRoles.Composer,
//               ]),
//             })
//           )
//           .min(1, "At least one artist role is required"),
//         genre: z
//           .array(z.string())
//           .length(1, "Please select at least one genre"),
//         explicit: z.boolean().optional(),
//         plays: z.number().min(0),
//         artists: z.array(z.string()).min(1, "At least one artist is required"),
//         duration: z.number().min(0),
//       })
//     )
//     .min(1, "At least one song is required"),
