import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { Artist } from "../types/artist";
import { Link } from "react-router-dom";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className="group flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition relative cursor-pointer">
      <div className="relative w-14 h-14">
        <img
          src={artist.cover}
          alt={`${artist.artist}-cover`}
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-full">
          <button className="text-white rounded-full p-2 cursor-pointer">
            <FaPlay className="w-4 h-4" onClick={() => {}} />
          </button>
        </div>
      </div>

      <Link to={`/artist/${artist.slug}`} className="flex-1 min-w-0">
        <p className="truncate font-medium">{artist.artist}</p>
        <p className="truncate text-sm text-zinc-400">Artist</p>
      </Link>
    </div>
  );
};

export default ArtistCard;
