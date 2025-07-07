import { Artist, ArtistRoles } from "./artist";

export interface Song {
  id: string;
  logo: string;
  title: string;
  slug: string;
  url: string;
  album?: string;
  artists: Artist[];
  artistsRoles: ArtistRoles[];
  genre: Array<
    "rock" | "pop" | "hip-hop" | "R&B" | "country" | "soul" | "electronic"
  >;
  createdAt: Date;
  duration: number;
  explicit: boolean;
  plays: number;
  featured: boolean;
}

const sampleUrl1 =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
// const sampleUrl2 =
//   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
// const sampleUrl3 =
//   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";
// const sampleUrl4 =
//   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";
// const sampleUrl5 =
//   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3";
// const sampleUrl6 =
//   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3";

export const songs: Song[] = [
  {
    id: "1",
    logo: "/obsessed.jpg",
    title: "Obsessed",
    slug: "obsessed",
    genre: ["pop", "electronic"],
    explicit: false,
    artistsRoles: [
      {
        _id: "1",
        artist: {
          _id: "1",
          artist: "Zandros",
          bio: "nineteen. singer-producer. syndey. these other girls arent my type, only you can do me right.",
          cover: "zandros.jpg",
          slug: "zandros",
          monthlyListeners: 10000,
        },
        role: "Main Artist",
      },
      {
        _id: "2",
        artist: {
          _id: "2",
          artist: "Limi",
          bio: "nineteen. singer-producer. syndey. these other girls arent my type, only you can do me right.",
          cover: "limi.jpg",
          slug: "limi",
          monthlyListeners: 10000,
        },
        role: "Producer",
      },
    ],
    artists: [
      {
        _id: "1",
        artist: "Zandros",
        bio: "nineteen. singer-producer. syndey. these other girls arent my type, only you can do me right.",
        songs: [],
        cover: "zandros.jpg",
        slug: "zandros",
        monthlyListeners: 10000,
      },
      {
        _id: "2",
        artist: "Limi",
        bio: "singer, songwriter, vibe curator 🌹",
        songs: [],
        cover: "limi.jpg",
        slug: "limi",
        monthlyListeners: 20000,
      },
    ],
    createdAt: new Date("2024-01-15"),
    duration: 210,
    url: sampleUrl1,
    plays: 10300,
    featured: false,
  },
  // {
  //   id: "2",
  //   logo: "/merazmen.png",
  //   title: "Merazmen",
  //   slug: "merazmen",
  //   artists: [
  //     {
  //       _id: "3",
  //       artist: "Shehab",
  //       bio: "Shehab El Sayed known as Shehab; is an R&B artist and Trap music performer, born on 30 March 1999, living in Alexandria, Egypt. Hes known for his famous hit Casanova and for Satfly Floosy",
  //       songs: [],
  //       cover: "shehab-cover-img.png",
  //       slug: "shehab",
  //       monthlyListeners: 600000,
  //     },
  //   ],
  //   artistsRoles: [
  //      {
  //        _id: "3",
  //        artist: {

  //        },
  //        role: "Main Artist",
  //      }
  //   ]
  //   createdAt: new Date("2024-02-20"),
  //   duration: 180,
  //   url: sampleUrl2,
  //   plays: 100200,
  // },
  // {
  //   id: "3",
  //   logo: "/eros.jpg",
  //   title: "Eros",
  //   slug: "eros",
  //   type: "Single",
  //   artists: [
  //     {
  //       _id: "4",
  //       artist: "zandros",
  //       bio: "nineteen. singer-producer. syndey. these other girls arent my type, only you can do me right.",
  //       songs: [],
  //       cover: "zandros.jpg",
  //       slug: "zandros",
  //       monthlyListeners: 10000,
  //     },
  //   ],
  //   dateAdded: new Date("2023-11-01"),
  //   url: sampleUrl3,
  //   duration: 160,
  //   plays: 10102,
  // },
  // {
  //   id: "4",
  //   cover: "/bury-say-my-name.jpg",
  //   title: "Say my name",
  //   slug: "say-my-name",
  //   type: "Single",
  //   artists: [
  //     {
  //       _id: "5",
  //       artist: "Bury",
  //       role: "Main Artist",
  //       cover: "bury.jpg",
  //       slug: "bury",
  //       monthlyListeners: 50000,
  //     },
  //   ],
  //   dateAdded: new Date("2024-03-10"),
  //   duration: 120,
  //   url: sampleUrl4,
  //   explicit: true,
  //   plays: 103011,
  // },
  // {
  //   id: "5",
  //   cover: "/limi-the-best.jpg",
  //   title: "The Best I Ever Had",
  //   slug: "the-best-i-ever-had",
  //   album: "The Best I Ever Had",
  //   type: "Album",
  //   artists: [
  //     {
  //       _id: "6",
  //       role: "Main Artist",
  //       artist: "Limi",
  //       cover: "limi.jpg",
  //       slug: "limi",
  //       monthlyListeners: 20000,
  //     },
  //   ],
  //   dateAdded: new Date("2023-09-05"),
  //   duration: 200,
  //   url: sampleUrl5,
  //   plays: 1000,
  // },
  // {
  //   id: "6",
  //   cover: "/6.44-mellina.jpg",
  //   title: "Before I Move On",
  //   slug: "before-i-move-on",
  //   album: "6:44",
  //   type: "Single",
  //   artists: [
  //     {
  //       _id: "7",
  //       artist: "Mellina Tey",
  //       cover: "mellina.jpg",
  //       slug: "mellina-tey",
  //       role: "Main Artist",
  //       monthlyListeners: 300000,
  //     },
  //   ],
  //   dateAdded: new Date("2023-12-12"),
  //   duration: 220,
  //   url: sampleUrl6,
  //   plays: 2000,
  // },
];

export const featuredSong = {
  title: "Eros",
  artists: ["zandros"],
  cover: "/eros.jpg",
};
