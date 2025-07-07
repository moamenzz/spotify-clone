import useUIStore from "../stores/useUIStore";
import { useEffect, useState } from "react";
import { extractColorFromImage } from "../utils/colorUtils";
import InteractionButtons from "../components/InteractionButtons";
import SongList from "../components/SongList";
import { QueueContext } from "../stores/useAudioPlayer";
import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../lib/apiRoutes";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorThrower from "../components/ErrorThrower";

const PlaylistPage = () => {
  const { setPlaylistCoverColor, playlistCoverColor } = useUIStore();
  const [coverColor, setCoverColor] = useState("#292929");

  const { slug } = useParams();

  const {
    data: playlist,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["playlist", slug],
    queryFn: () => getPlaylist(slug || ""),
  });

  const context: QueueContext = {
    id: playlist?._id || "1",
    title: playlist?.title || "unkown",
    slug: playlist?.slug || "unknown",
    type: "Playlist",
    songs: playlist?.songs || [],
  };

  useEffect(() => {
    let isMounted = true;

    const loadColor = async () => {
      try {
        const color = await extractColorFromImage(playlist?.logo as string);
        if (isMounted) {
          setCoverColor(color);
          setPlaylistCoverColor(color);
          console.log(playlistCoverColor);
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
  }, [playlist?.logo, setPlaylistCoverColor]);

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error} />
  ) : (
    <div className="min-h-screen mx-auto bg-[#131312]">
      {/* Playlist cover */}
      <div
        className="w-full h-[20rem]"
        style={{
          background: `linear-gradient(180deg, ${coverColor} 0%, #131312 100%)`,
        }}
      >
        {/* Playlist details */}
        <div className="flex px-10 py-8 gap-6">
          {/* Icon */}
          <div className="w-60 h-60 shadow-2xl">
            <img
              src={playlist?.logo}
              alt="/playlist-logo"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col mt-16 space-y-1">
            <p className="text-md font-semibold text-white">
              {playlist?.playlistType}
            </p>
            <h1 className="font-bold text-8xl text-white">{playlist?.title}</h1>
            <p className="text-sm font-bold text-[#888989]">
              {playlist?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Interaction Buttons */}
      <InteractionButtons
        type="playlist"
        previewImage="/eros.jpg"
        shuffleTooltip="Enable Shuffle"
        context={context}
        customButtons={
          <>
            {/* Save to Library Button */}
            <button
              className="text-lg font-bold text-[#B2B2B3] hover:text-[#F3F2F3] transition-colors duration-300 flex items-center cursor-pointer tooltip"
              data-tip="Save to Your Library"
            >
              <svg
                className="h-9 w-9"
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
          </>
        }
      />

      {/* Songs */}
      <div className="w-full px-6">
        <SongList
          type="Playlist"
          songs={playlist?.songs || []}
          showHeader={true}
          context={context}
        />
      </div>

      {/* TODO: Implement you might also like */}
      <div></div>
    </div>
  );
};

export default PlaylistPage;
