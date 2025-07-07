import { Artist } from "./artist";
import { Song } from "./songs";

export default interface Album {
  _id: string;
  logo: string;
  title: string;
  slug: string;
  artists: Artist[];
  songs: Song[];
  duration: number;
  createdAt: Date;
}
