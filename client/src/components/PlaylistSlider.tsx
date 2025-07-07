import { FC, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaPlay } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/mask.style.css";
import {
  BestOfArtistsPlaylistItems,
  EpisodesForYouPlaylistItems,
  ForYouPlaylistItems,
  JumpBackInPlaylistitems,
  PlaylistItem,
  PlaylistValue,
  RecentlyPlayedPlaylistItems,
  TrendingPlaylistItems,
  YourTopMixesPlaylistItems,
} from "../types/playlist";
import { Link } from "react-router-dom";

// TODO: Playlist Interfaces anpassen und mit die Interfaces in playlist.ts entsprechen.

interface PlaylistSliderProps<T extends PlaylistItem> {
  value?: PlaylistValue;
  playlists: T[];
}

const PlaylistSlider = <T extends PlaylistItem>({
  value = "For-you",
  playlists,
}: PlaylistSliderProps<T>) => {
  const { user } = useAuth();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [maskContent, setMaskContent] = useState<string>("mask-image-right");

  // Scroll handler
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }

      setTimeout(() => {
        if (container) {
          setShowLeftArrow(container.scrollLeft > 0);
          setShowRightArrow(
            container.scrollLeft <
              container.scrollWidth - container.clientWidth - 10
          );
        }
      }, 400);
    }
  };

  // Handle masking & arrow visibility
  const handleMaskAndArrow = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const hasLeftContent = container.scrollLeft > 0;
      const hasRightContent =
        container.scrollLeft <
        container.scrollWidth - container.clientWidth - 10;
      setShowLeftArrow(hasLeftContent);
      setShowRightArrow(hasRightContent);

      if (hasLeftContent && hasRightContent) {
        setMaskContent("mask-image-both");
      } else if (hasLeftContent) {
        setMaskContent("mask-image-left");
      } else if (hasRightContent) {
        setMaskContent("mask-image-right");
      } else {
        setMaskContent("");
      }
    }
  };

  // Scroll event handler
  const handleScrollEvent = () => {
    handleMaskAndArrow();
  };

  // Initializer
  useEffect(() => {
    handleMaskAndArrow();
  }, []);

  return (
    <div className="w-full pt-13 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {value === "For-you" ? `Made for ${user?.username}` : value}
        </h1>
        <p className="text-[#B0B1B0] font-semibold hover:underline cursor-pointer">
          Show all
        </p>
      </div>

      <div className="relative group/slider">
        {showLeftArrow && (
          <div className="absolute left-[-5%] top-[45%] z-10 opacity-0 group-hover/slider:translate-x-1/2 group-hover/slider:opacity-100 transition-all duration-300 ">
            <button
              onClick={() => handleScroll("left")}
              className="bg-[#0F0F0F]/80 hover:bg-[#181818]/90 transition-colors rounded-full p-1 shadow-lg cursor-pointer"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
          </div>
        )}

        <div
          className={`flex gap-4 overflow-x-hidden ${maskContent}`}
          onScroll={handleScrollEvent}
          ref={scrollContainerRef}
        >
          {playlists.map((playlist) => (
            <PlaylistComponent key={playlist.id} playlist={playlist} />
          ))}
        </div>

        {showRightArrow && (
          <div className="absolute right-0 top-[40%] z-10 opacity-0 group-hover/slider:translate-x-1/2 group-hover/slider:opacity-100 transition-all duration-300">
            <button
              onClick={() => handleScroll("right")}
              className="bg-[#0F0F0F]/80 hover:bg-[#181818]/90 transition-colors rounded-full p-1 shadow-lg cursor-pointer"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface PlaylistComponentProps {
  playlist: PlaylistItem;
}

const PlaylistComponent: FC<PlaylistComponentProps> = ({ playlist }) => {
  const isForYouPlaylist = (item: PlaylistItem): item is ForYouPlaylistItems =>
    item.type === "For-you";

  const isTrendingPlaylist = (
    item: PlaylistItem
  ): item is TrendingPlaylistItems => item.type === "Trending Albums/Singles";

  const isRecentlyPlayedPlaylist = (
    item: PlaylistItem
  ): item is RecentlyPlayedPlaylistItems => item.type === "Recently played";

  const isJumpBackInPlaylist = (
    item: PlaylistItem
  ): item is JumpBackInPlaylistitems => item.type === "Jump back in";

  const isYourTopMixesPlaylist = (
    item: PlaylistItem
  ): item is YourTopMixesPlaylistItems => item.type === "Your top mixes";

  const isEpisodesForYouPlaylist = (
    item: PlaylistItem
  ): item is EpisodesForYouPlaylistItems => item.type === "Episodes for you";

  const isBestOfArtistsPlaylist = (
    item: PlaylistItem
  ): item is BestOfArtistsPlaylistItems => item.type === "Best of artists";

  return (
    <Link to={`/playlist/${playlist.id}`}>
      <div
        className={`group/playlist relative min-w-[180px] max-w-[200px] rounded-md hover:bg-[#282828] cursor-pointer`}
      >
        <div className="p-2">
          {/* Image */}
          <div>
            <img
              src={playlist.logo}
              alt="playlist-logo"
              className={`w-48 h-42 object-cover ${
                (isRecentlyPlayedPlaylist(playlist) &&
                  playlist.playlistType === "Artist") ||
                (isJumpBackInPlaylist(playlist) &&
                  playlist.playlistType === "Artist")
                  ? "rounded-full"
                  : "rounded-lg"
              } aspect-video`}
            />
          </div>

          <div
            className={`absolute ${
              isRecentlyPlayedPlaylist(playlist) &&
              playlist.playlistType === "Artist"
                ? "right-4 bottom-10"
                : isJumpBackInPlaylist(playlist) &&
                  playlist.playlistType === "Artist"
                ? "right-4 bottom-19"
                : "right-4 bottom-16"
            }  opacity-0 group-hover/playlist:opacity-100 transition-opacity duration-300 cursor-pointer`}
          >
            {isJumpBackInPlaylist(playlist) &&
            playlist.playlistType === "Podcast" ? (
              <div></div>
            ) : (
              <button className="bg-green-500 rounded-full p-3.5 shadow-lg hover:bg-green-400 hover:scale-105 transition-all translate-y-2 group-hover/playlist:translate-y-0 duration-300 cursor-pointer">
                <FaPlay size={20} className="text-black" />
              </button>
            )}
          </div>

          {/* Content */}
          <div>
            {isForYouPlaylist(playlist) && (
              <div className="text-sm font-semibold mt-1 text-[#888989]">
                {playlist.artists.slice(0, 3).join(", ")}
                {playlist.artists.length > 3 && ` and more`}
              </div>
            )}
            {isTrendingPlaylist(playlist) && (
              <div className="flex flex-col">
                {/* Album/Single name */}
                <h1 className="text-white text-md">{playlist.title}</h1>
                {/* Type */}
                <p className="text-sm text-[#888989]">
                  {playlist.playlistType}
                </p>
              </div>
            )}
            {isRecentlyPlayedPlaylist(playlist) && (
              <div className="mt-1">
                <h1 className="text-white text-md">{playlist.title}</h1>
              </div>
            )}
            {isYourTopMixesPlaylist(playlist) && (
              <div className="text-sm font-semibold mt-1 text-[#888989]">
                {playlist.artists.slice(0, 3).join(", ")}
                {playlist.artists.length > 3 && ` and more`}
              </div>
            )}
            {isJumpBackInPlaylist(playlist) &&
              (playlist.playlistType === "Artist" ? (
                <div className="flex flex-col">
                  {/* Album/Single name */}
                  <h1 className="text-white text-md">{playlist.title}</h1>
                  {/* Type */}
                  <p className="text-sm text-[#888989]">
                    {playlist.playlistType}
                  </p>
                </div>
              ) : playlist.playlistType === "Single" ||
                playlist.playlistType === "Podcast" ? (
                <div className="flex flex-col">
                  {/* Title */}
                  <h1 className="text-white text-md">{playlist.title}</h1>
                  {/* Artist name */}
                  <p className="text-sm text-[#888989]">
                    {playlist.artist || playlist.playlistType}
                  </p>
                </div>
              ) : playlist.playlistType === "Playlist" ? (
                <div className="text-sm font-semibold mt-1 text-[#888989]">
                  {playlist.artist && playlist.artist.slice(0, 3).join(", ")}
                  {playlist.artist && playlist.artist.length > 3 && ` and more`}
                </div>
              ) : playlist.playlistType === "Episode" ? (
                <div className="flex flex-col">
                  {/* Album/Single name */}
                  <h1 className="text-white text-md">{playlist.title}</h1>
                  {/* Date & Time */}
                  <p className="text-sm text-[#888989]">
                    {playlist.dateAndTime}
                  </p>
                </div>
              ) : (
                ""
              ))}
            {isEpisodesForYouPlaylist(playlist) && (
              <div className="flex flex-col">
                {/* Album/Single name */}
                <h1 className="text-white text-md">{playlist.title}</h1>
                {/* Date & Time */}
                <p className="text-sm text-[#888989]">{playlist.dateAndTime}</p>
              </div>
            )}
            {isBestOfArtistsPlaylist(playlist) && (
              <div className="text-sm font-semibold mt-1 text-[#888989]">
                {playlist.title}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistSlider;
