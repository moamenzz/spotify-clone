import { Link } from "react-router-dom";
import { LuListMusic, LuPlus, LuUsers } from "react-icons/lu";
import { BiSolidAlbum } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAlbums, getArtists, getSongs } from "../lib/apiRoutes";
import useUIStore from "../stores/useUIStore";
import Loader from "../components/Loader";
import ErrorThrower from "../components/ErrorThrower";
import { Calendar, Trash2 } from "lucide-react";
import AdminModals from "../components/AdminModals";

const AdminPage = () => {
  const { adminActiveTab, setAdminActiveTab } = useUIStore();
  const {
    data: songs,
    isLoading: isSongsLoading,
    isError: isSongsError,
    error: songsError,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
    enabled: adminActiveTab === "Songs", // Only fetch when Songs tab is active
  });

  const {
    data: artists,
    isLoading: isArtistsLoading,
    isError: isArtistsError,
    error: artistsError,
  } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  const {
    data: albums,
    isLoading: isAlbumsLoading,
    isError: isAlbumsError,
    error: albumsError,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  const isLoading = isSongsLoading || isArtistsLoading || isAlbumsLoading;
  const isError = isSongsError || isArtistsError || isAlbumsError;
  const error = songsError || artistsError || albumsError;

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
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
    <div className="min-h-screen bg-[#131312]">
      <div className="mx-auto max-w-[96rem] py-6">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center space-y-6">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <svg
                  className="w-10 h-10 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.418.18-.8.6-.92 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </Link>
              {/* Text */}
              <div className="flex flex-col space-y-1">
                <h1 className="text-xl font-bold text-white">Music Manager</h1>
                <p className="text-md text-[#B0B1B0]">
                  Manage your music catalog
                </p>
              </div>
            </div>
            {/* User's Avatar */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  <img alt="User avatar" src="/obsessed.jpg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Stats */}
          <div className="flex items-center space-x-3 py-2">
            <div className="card bg-base-100 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">
                  <LuListMusic size={25} />
                  Total Songs
                </h2>
                <p className="text-xl">{songs?.length}</p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">
                  <BiSolidAlbum size={25} />
                  Total Albums
                </h2>
                <p className="text-xl">{albums?.length}</p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">
                  <LuUsers size={25} />
                  Total Artists
                </h2>
                <p className="text-xl">{artists?.length}</p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">
                  <FaUser size={25} />
                  Total Users
                </h2>
                <p className="text-xl">6</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col py-10">
            {/* Categories */}
            <div className="flex mb-4 space-x-2 overflow-x-auto pb-2">
              <button
                className={` ${
                  adminActiveTab !== "Songs"
                    ? "bg-neutral-800 text-white"
                    : "bg-gray-600 text-white"
                } hover:bg-neutral-700 transition-colors duration-300  px-3 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap`}
                onClick={() => setAdminActiveTab("Songs")}
              >
                Songs
              </button>
              <button
                className={`${
                  adminActiveTab !== "Albums"
                    ? "bg-neutral-800 text-white"
                    : "bg-gray-600 text-white"
                } hover:bg-neutral-700 transition-colors duration-300  px-3 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap`}
                onClick={() => setAdminActiveTab("Albums")}
              >
                Albums
              </button>
            </div>

            {/* Albums/Songs */}

            <div className="space-y-6">
              {adminActiveTab === "Songs" ? (
                <div className="card bg-base-100 w-full h-full shadow-sm">
                  <div className="card-body">
                    <div className="card-title justify-between flex">
                      <h2 className="flex gap-2 items-center">
                        <LuListMusic size={25} />
                        Music List
                      </h2>
                      <button
                        className="btn btn-soft btn-success"
                        onClick={() => {
                          const modal = document.getElementById(
                            "add_song_modal"
                          ) as HTMLDialogElement;
                          modal?.showModal();
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <LuPlus size={15} />
                          Add Song
                        </span>
                      </button>
                    </div>

                    <table className="w-full mt-4">
                      <thead className="text-left border-b border-zinc-800">
                        <tr>
                          <th className="pb-3">Title</th>
                          <th className="pb-3">Artist</th>
                          <th className="pb-3">Release Date</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-zinc-800">
                        {songs?.map((song) => (
                          <tr key={song.id} className="hover:bg-zinc-800/50">
                            <td className="py-4 font-medium flex gap-3 items-center">
                              <img
                                src={song.logo}
                                alt={song.title}
                                className="size-10 rounded object-cover"
                              />
                              {song.title}
                            </td>
                            <td className="py-4">
                              {song.artists
                                .map((artist) => artist.artist)
                                .join(", ")}
                            </td>
                            <td className="py-4">
                              <span className="inline-flex items-center gap-1 text-zinc-400">
                                <Calendar className="h-4 w-4" />
                                {song.createdAt.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <button className="text-red-500 hover:text-red-400">
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="card bg-base-100 w-full h-full shadow-sm">
                  <div className="card-body">
                    <div className="card-title justify-between flex">
                      <h2 className="flex gap-2 items-center">
                        <BiSolidAlbum size={25} />
                        Albums List
                      </h2>
                      <button
                        className="btn btn-soft btn-success"
                        onClick={() => {
                          const modal = document.getElementById(
                            "add_album_modal"
                          ) as HTMLDialogElement;
                          modal?.showModal();
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <LuPlus size={15} />
                          Add Album
                        </span>
                      </button>
                    </div>

                    <table className="w-full mt-4">
                      <thead className="text-left border-b border-zinc-800">
                        <tr>
                          <th className="pb-3">Title</th>
                          <th className="pb-3">Artist</th>
                          <th className="pb-3">Release Date</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-zinc-800">
                        {albums?.map((album) => (
                          <tr key={album._id} className="hover:bg-zinc-800/50">
                            <td className="py-4 font-medium flex items-center gap-3">
                              <img
                                src={album.logo}
                                alt={album.title}
                                className="size-10 rounded object-cover"
                              />
                              {album.title}
                            </td>
                            <td className="py-4">
                              {album.artists
                                .map((artist) => artist.artist)
                                .join(", ")}
                            </td>
                            <td className="py-4">
                              <span className="inline-flex items-center gap-1 text-zinc-400">
                                <Calendar className="h-4 w-4" />
                                {album.createdAt.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <button className="text-red-500 hover:text-red-400">
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AdminModals />
    </div>
  );
};

export default AdminPage;
