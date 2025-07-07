import { FC } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { SlOptions } from "react-icons/sl";
import ArtistDetailsCard from "./ArtistDetailsCard";
import CreditsCard from "./CreditsCard";
import MediaComponent from "./MediaComponent";
import useAudioPlayer from "../stores/useAudioPlayer";
import useUIStore from "../stores/useUIStore";
import { Artist } from "../types/artist";
import { Song } from "../types/songs";

export interface Queue {
  cover: string;
  name: string;
  artist: string;
}

interface ViewPlayerProps {
  song?: Song;
  artistDetails?: Artist;
  credits?: Artist;
  queue?: Queue;
}

const ViewPlayer: FC<ViewPlayerProps> = () => {
  const { currentSong, queue, queueContext } = useAudioPlayer();
  const { setViewPlayer, setQueue } = useUIStore();
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#131312] h-full rounded-xl p-3 flex flex-col w-full overflow-y-auto">
        {/* Song */}
        <div className="w-full mb-4">
          {/* Header */}
          <div className="flex justify-between items-center gap-2 sticky top-0 bg-[#131312] py-2 px-3 z-10">
            {queueContext && (
              <>
                <div>
                  <Link
                    to={`/${queueContext.type}/${queueContext.slug}`}
                    className="text-lg font-bold text-white hover:underline transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    {queueContext.title}
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="text-lg font-bold hover:bg-gray-800 transition-colors duration-300 rounded-full p-2 cursor-pointer tooltip tooltip-bottom dropdown dropdown-left"
                    data-tip="Options"
                  >
                    <div className="hover:text-[#F3F2F3] transition-colors duration-300">
                      <SlOptions />
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
                        <li>
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
                    </div>
                  </button>
                  <button
                    className="text-lg font-bold hover:bg-gray-800 transition-colors duration-300 rounded-full p-2 cursor-pointer"
                    onClick={() => setViewPlayer(false)}
                  >
                    <div
                      className="hover:text-[#F3F2F3] transition-colors duration-300 tooltip tooltip-bottom"
                      data-tip="Close"
                    >
                      <X />
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Song Details */}
          <div className="space-y-4">
            {currentSong && (
              <>
                {/* Cover - Reduzierte Größe */}
                <Link
                  to={`/single/${currentSong.slug}`}
                  className="flex justify-center items-center mt-4"
                >
                  <img
                    src={currentSong.logo}
                    alt="cover-img"
                    className="w-74 h-74 rounded-lg object-cover"
                  />
                </Link>

                {/* Song name, Artist name & Add to liked song button */}
                <div className="flex flex-col mt-2">
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/single/${currentSong.slug}`}
                      className="text-xl font-bold text-white hover:underline transition-colors duration-300 cursor-pointer"
                    >
                      {currentSong.title}
                    </Link>

                    <div
                      className="tooltip tooltip-left cursor-pointer font-semibold text-md text-[#B0B1B0] transition-colors duration-150 hover:text-white"
                      data-tip="Add to Liked Songs"
                    >
                      <svg
                        className="h-6 w-6 "
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
                    </div>
                  </div>

                  <div>
                    {currentSong.artists
                      .slice(0, 3)
                      .map((artist, index, array) => (
                        <span key={`${artist._id}-${index}`}>
                          <Link
                            to={`/artist/${artist.slug}`}
                            className="font-semibold text-lg text-[#B0B1B0] transition-colors duration-150 hover:text-white hover:underline"
                          >
                            {artist.artist}
                          </Link>
                          {index < array.length - 1 && (
                            <span className="font-semibold text-lg text-[#B0B1B0]">
                              ,
                            </span>
                          )}
                        </span>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Artist Details */}
        <div className="mb-4 w-full">
          {currentSong &&
            currentSong.artists
              .slice(0, 1)
              .map((artist) => <ArtistDetailsCard key={artist._id} />)}
        </div>

        {/* Credits */}
        <div className="mb-4 w-full">
          {currentSong && <CreditsCard key={currentSong.artists[0]._id} />}
        </div>

        {/* Queue */}
        <div className="w-full mb-4">
          <div className="card bg-[#1E1F1E] shadow-sm">
            <div className="card-body p-4">
              <div className="flex justify-between items-center">
                <h2 className="card-title text-white font-semibold text-lg">
                  Next in queue
                </h2>
                <span
                  className="text-gray-400 font-bold text-sm hover:text-white hover:underline duration-150 cursor-pointer"
                  onClick={() => {
                    setViewPlayer(false);
                    setQueue(true);
                  }}
                >
                  Open queue
                </span>
              </div>
              {queue.length > 0 ? (
                <MediaComponent />
              ) : (
                <p className="text-gray-400">No songs in queue</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlayer;
