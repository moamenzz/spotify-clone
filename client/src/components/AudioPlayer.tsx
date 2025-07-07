import {
  Laptop2,
  ListMusic,
  Mic2,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FC, useEffect } from "react";
import { formatTime } from "../utils/formatTime";
import useAudioPlayer from "../stores/useAudioPlayer";
import { toast } from "react-toastify";
import { MdViewCarousel } from "react-icons/md";
import useUIStore from "../stores/useUIStore";
import { Link } from "react-router-dom";

const AudioPlayer: FC = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    shuffle,
    repeat,
    volume,
    initializeAudio,
    togglePlay,
    playNext,
    playPrevious,
    toggleShuffle,
    setRepeat,
    seek,
    setVolume,
  } = useAudioPlayer();
  const { setViewPlayer, showViewPlayer, showQueue, setQueue } = useUIStore();

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleRepeatClick = () => {
    const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
    const currentIndex = modes.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeat(modes[nextIndex]);
  };

  return (
    <footer className="h-20 sm:h-24 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* currently playing song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong ? (
            <div className="flex space-x-3">
              <img
                src={currentSong.logo}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-md text-white hover:underline cursor-pointer">
                    {currentSong.title}
                  </h1>
                  <div className="flex gap-1 text-sm text-[#B2B2B3]">
                    {currentSong.artists ? (
                      currentSong.artists.map((artist, index) => (
                        <span key={`${artist._id}-${index}`}>
                          <Link
                            to={`/artist/${artist.slug}`}
                            className="hover:underline cursor-pointer"
                          >
                            {artist.artist}
                          </Link>
                          {index < currentSong.artists.length - 1 && (
                            <span>,</span>
                          )}
                        </span>
                      ))
                    ) : (
                      <p>Unknown Artist</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-3">
              <div className="w-14 h-14 object-cover rounded-md bg-gray-700" />
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-md text-white hover:underline cursor-pointer">
                    Unknown Song
                  </h1>
                  <p className="text-sm text-[#B2B2B3] hover:underline cursor-pointer">
                    Unknown Artist
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* player controls*/}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              className={`hidden sm:inline-flex cursor-pointer transition-transform hover:scale-105  ${
                shuffle ? "text-green-500" : `hover:text-white text-zinc-400`
              } `}
              onClick={toggleShuffle}
            >
              <Shuffle className="h-4 w-4" />
            </button>

            <button
              className="hover:text-white cursor-pointer text-zinc-400"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              className="flex justify-center items-center p-2 bg-white hover:bg-white/80  text-black cursor-pointer rounded-full"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? <FaPause size={15} /> : <FaPlay size={15} />}
            </button>
            <button
              className="hover:text-white cursor-pointer text-zinc-400"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="h-4 w-4" />
            </button>
            <button
              className={`hidden relative sm:inline-flex cursor-pointer transition-transform hover:scale-105 ${
                repeat === "one" || repeat === "all"
                  ? "text-green-500"
                  : `hover:text-white text-zinc-400`
              }`}
              onClick={handleRepeatClick}
            >
              <Repeat className="h-4 w-4" />
              {repeat === "one" && (
                <span className="absolute top-[50%] left-[25%]">1</span>
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">{formatTime(progress)}</div>
            <input
              type="range"
              min={0}
              max="100"
              value={duration > 0 ? (progress / duration) * 100 : 0}
              onChange={handleProgressChange}
              className="range w-full h-2 [--range-bg:white] [--range-thumb:black] [--range-fill:10]"
            />
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>
        {/* volume controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <button
            className="hover:text-white cursor-pointer text-zinc-400 tooltip"
            onClick={() => {
              setViewPlayer(!showViewPlayer);
              setQueue(false);
            }}
            data-tip="Now Playing View"
          >
            {showViewPlayer ? (
              <MdViewCarousel className="h-4 w-4 text-green-500" />
            ) : (
              <MdViewCarousel className="h-4 w-4" />
            )}
          </button>
          <button
            className="hover:text-white cursor-pointer text-zinc-400 tooltip"
            onClick={() => toast.info("Coming soon!")}
            data-tip="Lyrics"
          >
            <Mic2 className="h-4 w-4" />
          </button>
          <button
            className="hover:text-white cursor-pointer text-zinc-400 tooltip"
            onClick={() => {
              setQueue(!showQueue);
              setViewPlayer(false);
            }}
            data-tip="Queue"
          >
            {showQueue ? (
              <ListMusic className="h-4 w-4 text-green-500" />
            ) : (
              <ListMusic className="h-4 w-4" />
            )}
          </button>
          <button
            className="hover:text-white cursor-pointer text-zinc-400 tooltip"
            onClick={() => toast.info("Coming soon!")}
            data-tip="Connect to a device"
          >
            <Laptop2 className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              className="hover:text-white cursor-pointer text-zinc-400 tooltip"
              onClick={() => (volume === 0 ? setVolume(50) : setVolume(0))}
              data-tip="Mute"
            >
              <Volume1 className="h-4 w-4" />
            </button>
            <input
              type="range"
              min={0}
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="range w-full h-2 [--range-bg:white] [--range-thumb:black] [--range-fill:0]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AudioPlayer;
