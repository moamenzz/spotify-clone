import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { BasePlaylistItem } from "../types/playlist";
import { Link } from "react-router-dom";
import { SlOptions } from "react-icons/sl";

interface PlaylistCardProps {
  playlist: BasePlaylistItem;
}

const PlaylistCard: FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link
      to={`/playlist/${playlist.slug}`}
      className="group flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition relative cursor-pointer"
    >
      <div className="relative w-14 h-14">
        <img
          src={playlist.logo}
          alt={`${playlist.title}-cover`}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
          <button className="text-white rounded-full p-2 cursor-pointer">
            <FaPlay className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="truncate font-medium">{playlist.title}</p>
        <p className="truncate text-sm text-zinc-400">
          {playlist?.description} · {playlist.songs?.length} songs
        </p>
      </div>

      <button className="opacity-0 group-hover:opacity-100 transition cursor-pointer">
        <SlOptions className="w-5 h-5 text-zinc-400 hover:text-white" />
      </button>
    </Link>
  );
};

export default PlaylistCard;
