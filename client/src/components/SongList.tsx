import { FC } from "react";
import { useSortSongs } from "../utils/sortSongs";
import { FaPlay, FaRegClock } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
// import { formatDateAdded } from "../utils/formatDate";
import { MdExplicit } from "react-icons/md";
import { formatTime } from "../utils/formatTime";
import useAudioPlayer, { QueueContext } from "../stores/useAudioPlayer";
import { Song } from "../types/songs";

interface SongListProps {
  type: "Playlist" | "Album/Single";
  songs: Song[];
  showHeader?: boolean;
  context: QueueContext;
}

const SongList: FC<SongListProps> = ({
  songs,
  showHeader = true,
  type,
  context,
}) => {
  const { songs: sortedSongs, sortSongs, sortConfig } = useSortSongs(songs);
  const { playSong, togglePlay, audioElement } = useAudioPlayer();

  const handlePlaySong = (song: Song, index: number) => {
    if (audioElement?.src === song.url) {
      togglePlay();
    } else {
      playSong(song, {
        id: context.slug,
        title: context.title,
        type: context.type,
        slug: context.slug,
        songs: context.songs,
      });
      console.log(index);
    }
  };

  return (
    <div className="h-full flex flex-col mx-auto">
      <table className="table w-full text-left border-none">
        {showHeader && (
          <thead>
            <tr className="border-b border-gray-800">
              <th
                className="p-2 w-[30px] hover:text-white cursor-pointer"
                onClick={() => sortSongs("id")}
              >
                #{" "}
                {sortConfig.field === "id" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 hover:text-white cursor-pointer"
                onClick={() => sortSongs("title")}
              >
                Title{" "}
                {sortConfig.field === "title" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              {type === "Playlist" && (
                <>
                  <th
                    className="p-2 hover:text-white cursor-pointer"
                    onClick={() => sortSongs("album")}
                  >
                    Album{" "}
                    {sortConfig.field === "album" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="p-2 hover:text-white cursor-pointer"
                    onClick={() => sortSongs("createdAt")}
                  >
                    Date Added{" "}
                    {sortConfig.field === "createdAt" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                </>
              )}
              {type === "Album/Single" && (
                <th
                  className="p-2 hover:text-white cursor-pointer"
                  onClick={() => sortSongs("plays")}
                >
                  Plays{" "}
                  {sortConfig.field === "plays" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
              )}
              <th
                className="p-2 hover:text-white cursor-pointer"
                onClick={() => sortSongs("duration")}
              >
                <div className="flex items-center gap-1">
                  <FaRegClock />{" "}
                  {sortConfig.field === "duration" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </div>
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {sortedSongs.map((song, index) => (
            <tr key={index} className="group hover:bg-zinc-800 border-none">
              <td className="p-2 relative">
                <div className="group-hover:opacity-0">{index + 1}</div>
                <button
                  className="cursor-pointer"
                  onClick={() => handlePlaySong(song, 0)}
                >
                  <FaPlay
                    className="absolute top-[38%] opacity-0 group-hover:opacity-100"
                    size={15}
                  />
                </button>
              </td>
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <img
                    src={song.logo}
                    alt="song-logo"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-md font-semibold text-white">
                      <Link to={`/singles/${song.slug}`}>{song.title}</Link>
                    </h1>
                    <div className="flex gap-1 items-center">
                      {song.explicit && (
                        <div className="tooltip" data-tip="Explicit">
                          <MdExplicit size={20} fill="gray" />
                        </div>
                      )}
                      <div className="flex gap-1 text-[#B2B2B3] font-semibold">
                        {song.artists.slice(0, 3).map((artist, idx) => (
                          <span key={artist._id}>
                            {/* Key hinzugefügt */}
                            <Link
                              // Annahme: Du willst zur Künstlerseite basierend auf dem Namen (oder ID/Slug später)
                              to={`/artist/${artist.slug}`}
                              className="hover:text-white hover:underline"
                            >
                              {artist.artist}
                            </Link>
                            {idx < song.artists.slice(0, 3).length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              {type === "Playlist" && (
                <>
                  <td className="p-2 hover:underline cursor-pointer text-[#B2B2B3]">
                    <Link
                      to={
                        song.album
                          ? `/album/${song.album}`
                          : `/single/${song.slug}`
                      }
                    >
                      {song.album ? song.album : song.title}
                    </Link>
                  </td>

                  <td className="p-2 text-[#B2B2B3]">
                    {/* {song.createdAt.toLocaleString()} */}
                  </td>
                </>
              )}
              {type === "Album/Single" && (
                <td className="p-2 text-[#B2B2B3]">
                  {new Intl.NumberFormat().format(song.plays)}
                </td>
              )}
              <td className="p-2 text-[#B2B2B3] flex items-center">
                <button
                  className="opacity-0 group-hover:opacity-100 pr-3 hover:cursor-pointer text-[#B2B2B3] hover:text-white tooltip scale-105"
                  data-tip="Save to Your Library"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                {formatTime(song.duration)}
                <div
                  className="opacity-0 group-hover:opacity-100 pl-3 hover:cursor-pointer hover:text-white scale-105 tooltip"
                  data-tip="More Options"
                >
                  <SlOptions size={16} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
