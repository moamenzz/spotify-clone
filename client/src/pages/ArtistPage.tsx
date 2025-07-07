import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { extractColorFromImage } from "../utils/colorUtils";
import { songs } from "../types/songs";
import { Link, useParams } from "react-router-dom";
import { formatDateAdded } from "../utils/formatDate";
import InteractionButtons from "../components/InteractionButtons";
import SongList from "../components/SongList";
import {
  Artist,
  ArtistPick,
  FansAlsoLike,
  FeaturedOnPlaylists,
} from "../types/artist";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "../lib/apiRoutes";
import { PlaylistProps } from "../types/playlist";
import Loader from "../components/Loader";
import ErrorThrower from "../components/ErrorThrower";
import { QueueContext } from "../stores/useAudioPlayer";

interface ArtistProps extends Artist {
  cover: string;
  isVerified: boolean;
  likedSongs?: number;
  artistPick: ArtistPick;
  featuredOn?: FeaturedOnPlaylists[];
  appearsOn?: FansAlsoLike[];
  about: string;
}

const ArtistPage = () => {
  const { slug } = useParams();
  const isVerified = true;

  const {
    data: artist,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["artist", slug],
    queryFn: () => getArtist(slug ? slug : ""),
  });

  const mockArtist: ArtistProps = {
    _id: "1",
    artist: "Limi",
    cover: "limi-the-best.jpg",
    slug: "limi",
    isVerified: true,
    monthlyListeners: 603010,
    likedSongs: 2,
    about: "singer, songwriter, vibe curator 🌹",
    artistPick: {
      id: 1,
      title: "Dangerous",
      slug: "dangerous",
      cover: "limi-dangerous.jpg",
      comment: "Check out my new song",
      type: "Single",
    },
    featuredOn: [
      {
        id: 1,
        cover: "/limi.jpg",
        slug: "limi-mix",
        bioOrArtists: ["Limi", "Mellina Tey", "Bryson Tiller"],
        type: "Playlist",
      },
      {
        id: 2,
        title: "Limi Radio",
        cover: "/limi-dangerous.jpg",
        slug: "limi-radio",
        bioOrArtists: ["With Limi", "Mellina Tey", "Bryson Tiller"],
        type: "Playlist",
      },
    ],
    appearsOn: [
      {
        id: 1,
        title: "eros",
        cover: "/eros.jpg",
        slug: "eros",
        dateAdded: new Date("2024"),
        type: "Single",
      },
      {
        id: 2,
        title: "Obsessed",
        cover: "/obsessed.jpg",
        slug: "obsessed",
        dateAdded: new Date("2022"),
        type: "Single",
      },
    ],
  };
  const fansAlsoLikeArtists: FansAlsoLikeProps[] = [
    {
      id: 1,
      cover: "/zandros.jpg",
      title: "zandros",
      slug: "zandros",
      type: "Artist",
    },
    {
      id: 2,
      cover: "/shehab-cover-img.png",
      title: "Shehab",
      slug: "shehab",
      type: "Artist",
    },
    {
      id: 3,
      cover: "/bury.jpg",
      title: "BURY",
      slug: "bury",
      type: "Artist",
    },
    {
      id: 4,
      cover: "/mellina.jpg",
      title: "Mellina Tey",
      slug: "mellina-tey",
      type: "Artist",
    },
  ];
  const [coverColor, setCoverColor] = useState("#292929");
  const isFollowing = false;

  useEffect(() => {
    const loadColor = async () => {
      if (artist?.cover) {
        try {
          const color = await extractColorFromImage(artist.cover);
          setCoverColor(color);
        } catch (error) {
          console.error("Error loading color:", error);
          setCoverColor("#292929"); // Fallback color
        }
      }
    };
    loadColor();
  }, [artist?.cover]);

  const handleFollowClick = () => {};

  const queueContext: QueueContext = {
    id: "1",
    title: artist?.artist || "Unknown",
    slug: artist?.slug || "unkown",
    type: "Playlist",
    songs: artist?.songs || [],
  };

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error} />
  ) : (
    <div className="min-h-screen mx-auto bg-[#131312]">
      <div className="w-full h-[27rem]">
        {/* Cover image as background */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(${artist?.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dynamischer Gradient mit extrahierter Farbe */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, ${coverColor}99 50%, #131312 100%)`,
            }}
          >
            {/* Artist details */}
            <div className="flex px-10 py-8 gap-6 absolute bottom-0">
              {/* Text */}
              <div className="flex flex-col space-y-1">
                <p className="text-md font-semibold text-white">
                  {isVerified && (
                    <span className="flex items-center gap-1">
                      <GoVerified
                        size={25}
                        className="text-white"
                        style={{
                          fill: "#2E77D0",
                        }}
                      />
                      Verified Artist
                    </span>
                  )}
                </p>
                <h1 className="font-bold text-8xl text-white pb-3">
                  {artist?.artist}
                </h1>
                <p className="text-md text-white">
                  {artist?.monthlyListeners} monthly listeners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Buttons */}
      <InteractionButtons
        type="artist"
        previewImage={artist?.cover}
        shuffleTooltip={`Enable Shuffle for ${artist?.artist}`}
        followButton={{
          isFollowing: isFollowing,
          onFollowClick: handleFollowClick,
        }}
        context={queueContext}
      />

      {/* TODO: Optimize this page */}

      {/* Artist Popular songs */}
      <div className="h-full flex flex-col px-6 mx-auto">
        {/* Header */}
        <h1 className="text-white font-bold text-2xl pb-3">Popular</h1>

        <div className="w-full">
          <SongList
            songs={artist?.songs || []}
            type="Playlist"
            context={queueContext}
          />
        </div>
      </div>

      <div className="flex items-center gap-80 py-10 px-6">
        {/* Liked Songs */}
        <div>
          {mockArtist.likedSongs && (
            <div className="space-y-3">
              {/* Header */}
              <h1 className="text-white font-bold text-2xl">Liked Songs</h1>
              {/* Content */}
              <div className="flex gap-1 items-center">
                <img
                  src={artist?.cover}
                  alt={`${artist?.artist} cover`}
                  className="w-18 h-18 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <Link
                    to={`/playlist/liked-songs?artist=${artist?.artist}`}
                    className="text-white font-bold text-lg hover:underline"
                  >
                    You've liked {artist?.monthlyListeners} songs
                  </Link>
                  <p className="text-md font-semibold text-[#B2B2B3]">
                    By {artist?.artist}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Artist Pick */}
        <div className="space-y-3">
          {/* Header */}
          <h1 className="text-white font-bold text-2xl">Artist Pick</h1>
          {/* Content */}
          <div className="flex gap-2 items-center">
            <img
              src={`/${mockArtist.artistPick.cover}`}
              alt={`${mockArtist.artist} cover`}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              {/* Comment */}
              <div className="bg-white p-1 rounded-full flex items-center gap-1 w-fit">
                <img
                  src={`/${mockArtist.cover}`}
                  alt={`${mockArtist.artist} cover`}
                  className="w-6 h-6 object-cover rounded-full"
                />
                <p className="text-md font-semibold text-black">
                  {mockArtist.artistPick.comment}
                </p>
              </div>
              <Link
                to={
                  mockArtist.artistPick.type === "Album"
                    ? `/albums/${mockArtist.artistPick.slug}`
                    : `/single/${mockArtist.artistPick.slug}`
                }
                className="text-white font-bold text-lg hover:underline"
              >
                {mockArtist.artistPick.title}
              </Link>
              <p className="text-md font-semibold text-[#B2B2B3]">
                By {mockArtist.artist}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Discography */}
      <div className="space-y-6 px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-white font-bold text-2xl">Discography</h1>
          <Link
            to="/"
            className="text-sm font-semibold text-[#B2B2B3] hover:underline"
          >
            Show all
          </Link>
        </div>
        {/* Content */}
        <div className="flex space-x-6">
          {songs.slice(0, 5).map((song, index) => (
            <div
              className="relative flex flex-col space-y-3 group p-2 min-w-[180px] max-w-[200px] rounded-md hover:bg-[#282828] cursor-pointer"
              key={index}
            >
              {/* Cover */}
              <img
                src={song.logo}
                alt={`${song.title} logo`}
                className="w-48 h-42 object-cover aspect-video rounded-lg"
              />
              {/* Info */}
              <div>
                <p className="text-md font-semibold text-white">{song.title}</p>
                {/* Type */}
                <p className="text-sm font-semibold text-[#B2B2B3]">
                  {formatDateAdded(song.createdAt)} · {song.type}
                </p>
              </div>
              {/* Button */}
              <div className="absolute right-4 bottom-22 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <button className="bg-green-500 rounded-full p-3.5 shadow-lg hover:bg-green-400 hover:scale-105 transition-all translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer">
                  <FaPlay size={20} className="text-black" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featuring Artist | Official Playlists featuring artist*/}
      {mockArtist.featuredOn && (
        <div className="flex flex-col px-6 space-y-6 py-10">
          {/* Header */}
          <h1 className="text-white font-bold text-2xl">
            Featuring {mockArtist.artist}
          </h1>
          {/* Content */}
          <div className="flex space-x-3">
            {mockArtist.featuredOn.map((playlist, index) => (
              <div
                className="relative flex flex-col space-y-3 group p-2 min-w-[180px] max-w-[200px] rounded-md hover:bg-[#282828] cursor-pointer"
                key={index}
              >
                {/* Cover */}
                <img
                  src={playlist.cover}
                  alt={`${playlist.title} cover`}
                  className="w-48 h-42 object-cover aspect-video rounded-lg"
                />
                {/* Info */}
                <div>
                  <p className="text-md font-semibold text-white">
                    {playlist.title}
                  </p>
                  {/* Bio/Artists */}
                  <p className="text-sm font-semibold text-[#B2B2B3]">
                    {Array.isArray(playlist.bioOrArtists)
                      ? playlist.bioOrArtists.slice(0, 3).join(", ")
                      : playlist.bioOrArtists}
                    {Array.isArray(playlist.bioOrArtists) &&
                      playlist.bioOrArtists.length > 3 &&
                      ` and more`}
                  </p>
                </div>
                {/* Button */}
                <div className="absolute right-4 bottom-22 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <button className="bg-green-500 rounded-full p-3.5 shadow-lg hover:bg-green-400 hover:scale-105 transition-all translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer">
                    <FaPlay size={20} className="text-black" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fans also like */}
      <div>
        {/* Header */}
        <h1 className="text-white font-bold text-2xl">Fans also like</h1>
        {/* Content */}
        <div className="flex space-x-3">
          {fansAlsoLikeArtists.map((artist, index) => (
            <Link
              to={`/artist/${artist.slug}`}
              key={index}
              className="relative flex flex-col space-y-3 group p-2 min-w-[180px] max-w-[200px] rounded-md hover:bg-[#282828] cursor-pointer"
            >
              <img
                src={artist.cover}
                alt={`${artist.title} cover`}
                className="w-48 h-42 object-cover aspect-video rounded-full"
              />
              <div>
                <p className="text-md font-semibold text-white">
                  {artist.title}
                </p>
                <p className="text-sm font-semibold text-[#B2B2B3]">
                  {artist.type}
                </p>
              </div>
              <div className="absolute right-4 bottom-22 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <button className="bg-green-500 rounded-full p-3.5 shadow-lg hover:bg-green-400 hover:scale-105 transition-all translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer">
                  <FaPlay size={20} className="text-black" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Appears on | Songs and albums featuring artists */}

      {mockArtist.appearsOn && (
        <div className="flex flex-col px-6 space-y-6 py-10">
          {/* Header */}
          <h1 className="text-white font-bold text-2xl">Appears On</h1>
          {/* Content */}
          <div className="flex space-x-3">
            {mockArtist.appearsOn.map((playlist, index) => (
              <div
                className="relative flex flex-col space-y-3 group p-2 min-w-[180px] max-w-[200px] rounded-md hover:bg-[#282828] cursor-pointer"
                key={index}
              >
                {/* Cover */}
                <img
                  src={playlist.cover}
                  alt={`${playlist.title} cover`}
                  className="w-48 h-42 object-cover aspect-video rounded-lg"
                />
                {/* Info */}
                <div>
                  <p className="text-md font-semibold text-white">
                    {playlist.title}
                  </p>
                  {/* Bio/Artists */}
                  <p className="text-sm font-semibold text-[#B2B2B3]">
                    {playlist.dateAdded.toLocaleString()} · {playlist.type}
                  </p>
                </div>
                {/* Button */}
                <div className="absolute right-4 bottom-22 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <button className="bg-green-500 rounded-full p-3.5 shadow-lg hover:bg-green-400 hover:scale-105 transition-all translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer">
                    <FaPlay size={20} className="text-black" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About Artist */}
      {artist && (
        <div className="flex flex-col px-6 space-y-10 py-10 w-[50rem] h-[40rem]">
          {/* Header */}
          <h1 className="text-white font-bold text-2xl">
            About {artist.artist}
          </h1>
          {/* Content */}
          <div className="w-full h-full relative">
            <img
              src={artist.cover}
              alt={`${artist.artist} cover`}
              className="w-full h-full object-cover aspect-video rounded-lg"
            />
            {/* Text */}
            <div className="absolute top-[70%] left-[5%] w-full space-y-2">
              <h1 className="text-white font-semibold text-lg">
                {artist.monthlyListeners} monthly listeners
              </h1>
              <p className="text-white font-semibold text-md">{artist.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
