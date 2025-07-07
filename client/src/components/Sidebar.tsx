import { FC } from "react";
import useUIStore from "../stores/useUIStore";
import { BasePlaylistItem } from "../types/playlist";
import {
  createCustomPlaylist,
  getUserLibrary,
  LibraryResponse,
} from "../lib/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import ErrorThrower from "./ErrorThrower";
import { Artist } from "../types/artist";
import ArtistCard from "./ArtistCard";
import PlaylistCard from "./PlaylistCard";
import queryClient from "../config/queryClient";

interface SidebarProps {
  artists?: Artist[];
  playlists?: BasePlaylistItem[];
}

export const Sidebar: FC<SidebarProps> = () => {
  const { showSidebar, setSidebar } = useUIStore();

  const {
    data: userLibrary,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["library"],
    queryFn: getUserLibrary,
  });

  const { mutate: customPlaylistMutation } = useMutation({
    mutationFn: createCustomPlaylist,
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["library"] });

      // Make a snapshot of the previous version
      const previousLibrary = queryClient.getQueryData<LibraryResponse>;
      // Optimistically update the cache
      queryClient.setQueryData<LibraryResponse>(["library"], (old) => {
        if (!old) return old;

        const optimisiticPlaylist: BasePlaylistItem = {
          id: "temp-" + Date.now(),
          title: "New Playlist",
          logo: "https://www.beatstars.com/assets/img/placeholders/playlist-placeholder.svg", // Stelle sicher, dass du ein Default-Bild hast
          description: "Playlist",
          type: "Playlist" as const,
          slug: "new-playlist",
        };

        return {
          ...old,
          playlists: [...old.playlists, optimisiticPlaylist],
        };
      });

      return { previousLibrary };
    },
    onError: (err, variables, context) => {
      // Wenn ein Fehler auftritt, setze den vorherigen Zustand zurück
      if (context?.previousLibrary) {
        queryClient.setQueryData(["library"], context.previousLibrary);
      }
    },
    onSettled: () => {
      // Egal ob Erfolg oder Fehler, aktualisiere die Daten im Hintergrund

      queryClient.invalidateQueries({ queryKey: ["library"] });
    },
  });

  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) : isError ? (
        <div>
          <ErrorThrower isError={isError} error={error} />
        </div>
      ) : (
        <div className="bg-[#131312] h-full rounded-xl p-2 flex flex-col justify-start items-start w-full">
          {/* Header */}
          <div className="flex justify-between items-center gap-6 w-full p-2 mb-4">
            {/* Icon */}
            <div
              onClick={() => {
                setSidebar(!showSidebar);
              }}
            >
              <h1 className="text-lg font-bold text-[#B2B2B3] hover:text-[#F3F2F3] transition-colors duration-300 flex items-center cursor-pointer">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Your Library
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-lg font-bold text-[#B2B2B3] hover:text-[#F3F2F3] transition-colors duration-300 flex items-center cursor-pointer tooltip tooltip-left"
                data-tip="Create Playlist"
                onClick={() => customPlaylistMutation()}
              >
                <svg
                  className="h-6 w-6"
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
            </div>
          </div>

          {/* Categories, Artists & Navigation*/}
          <div className="w-full px-2 overflow-y-auto flex-grow">
            {/* Categories */}
            <div className="flex mb-4 space-x-2 overflow-x-auto pb-2">
              <button className="bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 text-white px-3 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap">
                Playlists
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 text-white px-3 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap">
                Artists
              </button>
            </div>
            {/* Navigation */}
            <div className="flex justify-between items-center px-2 mb-4">
              <label className="input bg-transparent">
                <svg
                  className="h-[1.2rem] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" className="grow" placeholder="Search" />
              </label>
            </div>

            {/* Artists */}
            <div className="space-y-1 mt-4">
              {userLibrary?.artists?.map((artist) => (
                <ArtistCard key={artist._id} artist={artist} />
              ))}
              {userLibrary?.playlists?.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MinimizedSidebar = () => {
  const { showSidebar, setSidebar } = useUIStore();

  return (
    <div className="flex flex-col items-center">
      <div onClick={() => setSidebar(!showSidebar)}>
        <svg
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      </div>
    </div>
  );
};
