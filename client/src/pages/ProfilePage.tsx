import { useEffect, useState } from "react";
import { extractColorFromImage } from "../utils/colorUtils";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
// import SongList from "../components/SongList";
// import { songs } from "../types/songs";
// import { useQuery } from "@tanstack/react-query";
// import { getUser } from "../lib/apiRoutes";

interface UserProps {
  id: number;
  name: string;
  cover: string;
  publicPlaylist?: number;
  followers?: number;
  following?: number;
}

interface TopArtistProps {
  id: number;
  cover: string;
  title: string;
  slug: string;
  type: string;
}

const ProfilePage = () => {
  const [coverColor, setCoverColor] = useState("#292929");

  // const {
  //   data: user,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getUser,
  // });

  const mockUser: UserProps = {
    id: 1,
    name: "Limi",
    cover: "/limi-the-best.jpg",
    publicPlaylist: 12,
    followers: 603010,
    following: 2,
  };

  const topArtists: TopArtistProps[] = [
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
  ];

  // const topTracks = songs.slice(0, 2);

  useEffect(() => {
    let isMounted = true;

    const loadColor = async () => {
      try {
        const color = await extractColorFromImage(mockUser.cover);
        if (isMounted) {
          setCoverColor(color);
        }
      } catch (error) {
        console.error("Fehler:", error);
        setCoverColor("#292929");
      }
    };

    loadColor();
    return () => {
      isMounted = false;
    };
  }, [mockUser.cover, setCoverColor]);

  return (
    <div className="min-h-screen bg-[#131312]">
      {/* User cover */}
      <div
        className={`w-full h-[20rem] mx-auto`}
        style={{
          background: `linear-gradient(180deg, ${coverColor} 95%, #131312 100%)`,
        }}
      >
        {/* Single details */}
        <div className="flex px-10 py-8 gap-6">
          {/* Icon */}
          <div className="w-60 h-60 rounded-full shadow-2xl">
            <img
              src={mockUser?.cover || "/user-placeholder.png"}
              alt={`${mockUser.cover}-cover`}
              className="object-cover rounded-full w-full h-full"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col mt-16 space-y-1">
            <p className="text-md font-semibold text-white">Profile</p>
            <h1 className="font-bold text-7xl text-white">{mockUser.name}</h1>
            <p className="text-sm font-bold text-[#888989] pt-3">
              {mockUser.publicPlaylist} Public Playlists ·{" "}
              {mockUser.followers &&
                new Intl.NumberFormat().format(mockUser.followers)}{" "}
              Followers ·{" "}
              {mockUser.following &&
                new Intl.NumberFormat().format(mockUser.following)}{" "}
              Following
            </p>
          </div>
        </div>
      </div>

      {/* Top Artists */}
      <div className="flex flex-col px-6 space-y-6 py-8">
        {/* Header */}
        <h1 className="text-white font-bold text-2xl">
          Top artists this month
        </h1>
        {/* Content */}
        <div className="flex space-x-3">
          {topArtists.map((artist, index) => (
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

      {/* Top Tracks */}
      <div className="flex flex-col px-6 space-y-6 py-8">
        {/* Header */}
        <h1 className="text-white font-bold text-2xl flex flex-col">
          Top tracks this month{" "}
          <p className="text-sm text-[#B2B2B3]">Only visible to you</p>
        </h1>
        {/* Content */}
        {/* <div>
          <SongList type="Playlist" songs={topTracks} showHeader={false} context={}/>
        </div> */}
      </div>

      {/* Following */}
      <div className="flex flex-col px-6 space-y-6 py-8">
        {/* Header */}
        <h1 className="text-white font-bold text-2xl">Following</h1>
        {/* Content */}
        <div className="flex space-x-3">
          {topArtists.map((artist, index) => (
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
    </div>
  );
};

export default ProfilePage;
