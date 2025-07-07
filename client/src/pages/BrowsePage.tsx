import { useQuery } from "@tanstack/react-query";
import { getAlbums, getArtists, getSongs } from "../lib/apiRoutes";
import useUIStore from "../stores/useUIStore";
import SongList from "../components/SongList";
import { Loader } from "lucide-react";
import ErrorThrower from "../components/ErrorThrower";
import { QueueContext } from "../stores/useAudioPlayer";
import { Link } from "react-router-dom";
import InteractionButtons from "../components/InteractionButtons";

const BrowsePage = () => {
  const { setBrowseActiveTab, browseActiveTab } = useUIStore();

  const {
    data: songs,
    isLoading: isSongsLoading,
    isError: isSongsError,
    error: songsError,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
    enabled: browseActiveTab === "Songs", // Only fetch when Songs tab is active
  });

  const {
    data: artists,
    isLoading: isArtistsLoading,
    isError: isArtistsError,
    error: artistsError,
  } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
    enabled: browseActiveTab === "Artists", // Only fetch when Artists tab is active
  });

  const {
    data: albums,
    isLoading: isAlbumsLoading,
    isError: isAlbumsError,
    error: albumsError,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
    enabled: browseActiveTab === "Albums", // Only fetch when Albums tab is active
  });

  const isLoading = isSongsLoading || isArtistsLoading || isAlbumsLoading;
  const isError = isSongsError || isArtistsError || isAlbumsError;
  const error = songsError || artistsError || albumsError;
  const isFollowing = false;

  const context: QueueContext = {
    id: "all-songs",
    title: "All Songs",
    slug: "all-songs",
    type: "Playlist",
    songs: songs ? songs : [],
  };

  return (
    <div className="min-h-screen bg-[#131312]">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : isError ? (
        <ErrorThrower
          isError={isError}
          error={
            error
              ? { message: error.message }
              : { message: "An unknown error occurred" }
          }
        />
      ) : (
        <div className="mx-auto">
          <div className="flex flex-col px-6 py-3 space-y-6">
            {/* Header */}
            <div>
              <h1
                className="text-2xl font-bold text-white cursor-pointer tooltip tooltip-right"
                data-tip="Browse all categories"
                onClick={() => setBrowseActiveTab("")}
              >
                Browse All
              </h1>
            </div>

            {browseActiveTab === "Songs" ? (
              <div className="space-y-3">
                <InteractionButtons
                  type="playlist"
                  shuffleTooltip="Enable Shuffle"
                  previewImage={"/on-repeat.jpg"}
                  context={context}
                />
                <SongList
                  songs={songs ? songs : []}
                  type="Playlist"
                  context={context}
                />
              </div>
            ) : browseActiveTab === "Artists" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artists?.map((artist) => (
                  <Link
                    to={`/artist/${artist.slug}`}
                    key={artist._id}
                    className="p-4 bg-[#181818] rounded-lg hover:bg-[#282828] transition-colors cursor-pointer"
                  >
                    <img
                      src={artist.cover}
                      alt={artist.artist}
                      className="w-full aspect-square object-cover rounded-md mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-semibold">
                        {artist.artist}
                      </h3>
                      <button className="bg-transparent border-2 border-[#B0B1B0] w-[5rem] h-[2rem] rounded-full cursor-pointer text-white font-bold text-md hover:border-white hover:scale-110 transition-transform duration-300">
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : browseActiveTab === "Albums" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {albums?.map((album) => (
                  <Link
                    to={`/album/${album.slug}`}
                    key={album._id}
                    className="p-4 bg-[#181818] rounded-lg hover:bg-[#282828] transition-colors cursor-pointer"
                  >
                    <img
                      src={album.logo}
                      alt={album.title}
                      className="w-full aspect-square object-cover rounded-md mb-4"
                    />
                    <h3 className="text-white font-semibold">{album.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {album.artists?.map((artist) => artist.artist).join(", ")}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex space-x-6">
                {/* Music */}
                <div
                  className="w-80 h-45 rounded-lg relative bg-red-600 cursor-pointer scale-100 opacity-100 group hover:opacity-80 transition-all duration-300"
                  onClick={() => setBrowseActiveTab("Songs")}
                >
                  {/* Title */}
                  <h1 className="text-lg font-bold text-white p-3">Music</h1>
                  {/* Image */}
                  <img
                    src="/limi-the-best.jpg"
                    alt=""
                    className="w-20 h-20 absolute bottom-0 right-0"
                  />
                </div>

                {/* Albums */}
                <div
                  className="w-80 h-45 rounded-lg relative bg-blue-600 cursor-pointer scale-100 opacity-100 group hover:opacity-80 transition-all duration-300"
                  onClick={() => setBrowseActiveTab("Albums")}
                >
                  {/* Title */}
                  <h1 className="text-lg font-bold text-white p-3">Albums</h1>
                  {/* Image */}
                  <img
                    src="/limi-the-best.jpg"
                    alt=""
                    className="w-20 h-20 absolute bottom-0 right-0"
                  />
                </div>

                {/* Artists */}
                <div
                  className="w-80 h-45 rounded-lg relative bg-green-600 cursor-pointer scale-100 opacity-100 group hover:opacity-80 transition-all duration-300"
                  onClick={() => setBrowseActiveTab("Artists")}
                >
                  {/* Title */}
                  <h1 className="text-lg font-bold text-white p-3">Artists</h1>
                  {/* Image */}
                  <img
                    src="/limi-the-best.jpg"
                    alt=""
                    className="w-20 h-20 absolute bottom-0 right-0"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
