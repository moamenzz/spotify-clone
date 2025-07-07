import { FC } from "react";
import { SlOptions } from "react-icons/sl";

interface FeaturedSongProps {
  featuredSong: { id: string; title: string; artists: string[]; cover: string };
}

const FeaturedSongCard: FC<FeaturedSongProps> = ({
  featuredSong = { title: "Eros", artists: ["zandros"], cover: "/eros.jpg" },
}) => {
  return (
    <div className="bg-gradient-to-r from-black to-[#131312] w-full h-[20rem] relative">
      {/* Fade */}
      <h1 className="badge badge-soft badge-neutral text-white font-semibold absolute top-14 left-200">
        Featured
      </h1>
      {/* Picture & Info */}
      <div className="flex p-6 items-center gap-3">
        {/* Picture */}
        <div>
          <img
            src={featuredSong.cover}
            alt="featured-song"
            className="w-64 h-64 object-cover"
          />
        </div>
        {/* Featured song info */}
        <div className="flex flex-col space-y-3 text-white p-4 h-[30vh]">
          {/* Label */}
          <div className="flex justify-between items-center space-x-16">
            <h1 className="text-md font-bold text-white">Song</h1>
          </div>
          {/* Song name */}
          <h1 className="text-4xl font-bold hover:underline cursor-pointer">
            {featuredSong.title}
          </h1>
          {/* Artist name */}
          <h2 className="font-semibold underline text-xl cursor-pointer">
            {featuredSong.artists}
          </h2>
          <p className="font-semibold text-md">Listen Now</p>
          {/* Action buttons */}
          <div className="space-x-3 flex items-center">
            <button className="btn bg-green-500 text-black w-[6rem] h-[3rem] hover:scale-105 transition-transform duration-300 rounded-full cursor-pointer">
              Play
            </button>
            <button className="bg-transparent border-2 border-[#B0B1B0] w-[6rem] h-[3rem] rounded-full cursor-pointer text-white font-bold text-md hover:border-white hover:scale-105 transition-transform duration-300">
              Save
            </button>
            <button className="cursor-pointer text-[#B0B1B0] hover:text-white transition-colors duration-200">
              <SlOptions size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSongCard;
