import { FaPause, FaPlay } from "react-icons/fa";
import { IoShuffle } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { toast } from "react-toastify";
import useAudioPlayer, { QueueContext } from "../stores/useAudioPlayer";
import { Song } from "../types/songs";

interface InteractionButtonsProps {
  type: "artist" | "playlist" | "single/album";
  followButton?: {
    isFollowing: boolean;
    onFollowClick: () => void;
  };
  previewImage?: string;
  shuffleTooltip?: string;
  customButtons?: React.ReactNode;
  context: QueueContext;
}

const InteractionButtons = ({
  followButton,
  previewImage,
  shuffleTooltip,
  customButtons,
  context,
}: InteractionButtonsProps) => {
  const { playSong, isPlaying, audioElement, togglePlay } = useAudioPlayer();
  const handlePlaySong = (song: Song, index: number) => {
    playSong(song, {
      id: context.slug,
      title: context.title,
      slug: context.slug,
      type: context.type,
      songs: context.songs,
    });
    console.log(index);
  };

  return (
    <div className="flex justify-between items-center my-8 px-6">
      {/* Left components */}
      <div className="flex items-center space-x-6">
        {/* Play button */}
        <button
          className="bg-green-500 rounded-full p-4 shadow-lg hover:bg-green-400 hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => {
            if (!audioElement) {
              handlePlaySong(context.songs[0], 0);
            } else {
              togglePlay();
            }
          }}
        >
          {isPlaying ? (
            <FaPause size={20} className="text-black" />
          ) : (
            <FaPlay size={20} className="text-black" />
          )}
        </button>

        {/* Preview */}
        {previewImage && (
          <div
            className="border-2 border-gray-600 rounded-lg p-1 w-14 h-14 cursor-pointer tooltip font-bold text-[#B2B2B3]"
            onClick={() => toast.info("Coming Soon!")}
            data-tip="Preview"
          >
            <img
              src={previewImage}
              alt="preview-cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Shuffle */}
        <button
          className="text-lg font-bold text-[#B2B2B3] hover:text-[#F3F2F3] transition-colors duration-300 flex items-center cursor-pointer tooltip"
          data-tip={shuffleTooltip || "Enable Shuffle"}
        >
          <IoShuffle size={38} />
        </button>

        {/* Follow button for artists */}
        {followButton && (
          <button
            onClick={followButton.onFollowClick}
            className="bg-transparent border-2 border-[#B0B1B0] w-[5rem] h-[2.2rem] rounded-full cursor-pointer text-white font-bold text-md hover:border-white hover:scale-110 transition-transform duration-300"
          >
            {followButton.isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        {/* Custom Buttons */}
        {customButtons}

        {/* More Options */}
        <button
          className="cursor-pointer text-[#B2B2B3] font-bold hover:text-white transition-colors duration-200 tooltip dropdown"
          data-tip="More Options"
        >
          <SlOptions size={26} />
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Add to your Library</a>
            </li>
            <li>
              <a>Add to Queue</a>
            </li>
            <li>
              <a>Report</a>
            </li>
            <li>
              <a>Download</a>
            </li>
            <li>
              <a>About Recommendations</a>
            </li>
          </ul>
        </button>
      </div>
    </div>
  );
};

export default InteractionButtons;
