import { X } from "lucide-react";
import useUIStore from "../stores/useUIStore";
import { Song, songs } from "../types/songs";
import useAudioPlayer from "../stores/useAudioPlayer";
import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

const Queue = () => {
  const { setQueue, activeTab, setActiveTab } = useUIStore();
  const { queue, currentSong, queueContext } = useAudioPlayer();
  const recentlyPlayedSongs = songs;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#131312] h-full rounded-xl p-3 flex flex-col w-full overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          {/* Grid */}
          <div className="grid grid-cols-2">
            {/* Queue */}
            <button
              className="hover:bg-gray-600"
              onClick={() => setActiveTab("Queue")}
            >
              <h1
                className={`p-1 font-bold text-md text-white text-center cursor-pointer ${
                  activeTab === "Queue" ? "border-b-2 border-green-500" : ""
                }`}
              >
                Queue
              </h1>
            </button>
            {/* Recently Played */}
            <button
              className={`p-1 hover:bg-gray-600 cursor-pointer ${
                activeTab === "Recently-Played"
                  ? "border-b-2 border-green-500"
                  : ""
              }`}
              onClick={() => setActiveTab("Recently-Played")}
            >
              <h1 className="font-bold text-md text-white flex justify-center text-center">
                Recently Played
              </h1>
            </button>
          </div>
          {/* X Button */}
          <button className="text-lg font-bold hover:bg-gray-800 transition-colors duration-300 rounded-full p-2 cursor-pointer">
            <div
              className="hover:text-[#F3F2F3] transition-colors duration-300"
              onClick={() => setQueue(false)}
            >
              <X />
            </div>
          </button>
        </div>

        {/* Queue */}
        {activeTab === "Queue" ? (
          <div>
            {queue.length > 0 ? (
              <div>
                {/* Now Playing */}
                {currentSong && (
                  <div>
                    <h1 className="font-bold text-md text-white">
                      Now Playing:
                    </h1>

                    <QueueComponent songs={[currentSong]} />
                  </div>
                )}
                {/* Playing Next */}
                <div>
                  <h1 className="font-bold text-md text-white">
                    Next From: {queueContext.title}
                  </h1>

                  <QueueComponent songs={queue} />
                </div>
              </div>
            ) : (
              <div className="text-white font-bold">Queue is empty</div>
            )}
          </div>
        ) : (
          <div>
            <div>
              <QueueComponent songs={recentlyPlayedSongs} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface QueueComponentProps {
  songs: Song[];
}

const QueueComponent: FC<QueueComponentProps> = ({ songs }) => {
  const { playSong, removeFromQueue, queueContext } = useAudioPlayer();
  const handlePlaySong = (song: Song, index: number) => {
    playSong(song, {
      id: queueContext.slug,
      title: queueContext.title,
      slug: queueContext.slug,
      type: "Playlist",
      songs: queueContext.songs,
    });
  };

  return (
    <div>
      {/* Cover mit Play-Button */}
      {songs.map((song, index) => (
        <div className="group flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition relative cursor-pointer">
          <div className="relative w-14 h-14">
            <img
              src={song.logo}
              alt={`${song}-cover`}
              className={`w-full h-full object-cover`}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition`}
            >
              <button
                className="text-white rounded-full p-2 cursor-pointer "
                onClick={() => handlePlaySong(song, index)}
              >
                <FaPlay className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Song-Info */}
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{song.title}</p>
            <p className="truncate text-sm text-zinc-400">
              {song.artists.map((artist) => artist.artist).join(", ")}
            </p>
          </div>

          {/* More Options */}
          <button
            className="hidden group-hover:flex cursor-pointer text-[#B2B2B3] font-bold dropdown-left hover:text-white transition-colors duration-200 tooltip dropdown"
            data-tip="More Options"
          >
            <SlOptions size={26} />
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Save to Liked Songs</a>
              </li>
              <li>
                <a>Add to Queue</a>
              </li>
              <li onClick={() => removeFromQueue(index)}>
                <a>Remove from Queue</a>
              </li>
              <span className="border-b border-[#B2B2B3] w-full"></span>
              <li>
                <a>Go to Song Radio</a>
              </li>
              <li>
                <a>Go to Artist Radio</a>
              </li>
              <li>
                <a>Go to Album</a>
              </li>
              <li>
                <a>View Credits</a>
              </li>
            </ul>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Queue;
