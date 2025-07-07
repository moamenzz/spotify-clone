import { useMutation } from "@tanstack/react-query";
import { LuUpload } from "react-icons/lu";
import { createSong } from "../lib/apiRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ErrorThrower from "./ErrorThrower";
import { useState } from "react";

export interface SongFormData {
  cover: string;
  title: string;
  artist: string;
  artistRole: string;
  album?: string;
  genre: string;
  explicit?: boolean;
  song: string;
}

// export interface AlbumFormData {}

const AdminModals = () => {
  const navigate = useNavigate();
  const [songFormData, setSongFormData] = useState<SongFormData>({
    cover: "",
    title: "",
    artist: "",
    artistRole: "",
    genre: "",
    song: "",
  });
  console.log(setSongFormData);

  const {
    mutate: createSongMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createSong,
    onSuccess: (data) => {
      (document.getElementById("add_song_modal") as HTMLDialogElement)?.close();
      toast.success("Song created successfully!");
      navigate(`/single/${data.slug}`);
    },
  });
  return (
    <>
      {/* Add Song Modal */}
      <dialog id="add_song_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Add New Song</h3>
          <form
            className="space-y-4"
            onSubmit={() => createSongMutation(songFormData)}
          >
            {/* Cover  */}

            <div className="form-control space-y-3">
              <label className="label">
                <span className="label-text">Upload Song Cover/Thumbnail</span>
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <LuUpload className="w-8 h-8" />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>

            {/* Title */}
            <div className="form-control space-y-3">
              <label className="label">
                <span className="label-text">Song Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter song title"
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Artist</span>
                </label>
                <select className="select select-bordered w-full">
                  <option disabled selected>
                    Select artist
                  </option>
                  {/* We'll populate this dynamically */}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Album (Optional)</span>
                </label>
                <select className="select select-bordered w-full">
                  <option disabled selected>
                    Select album
                  </option>
                  {/* We'll populate this dynamically */}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Song Genre</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Select Genre
                </option>
              </select>
            </div>

            <div className="form-control space-x-2">
              <label className="label">
                <span className="label-text">Explicit Song</span>
              </label>
              <input
                type="checkbox"
                className="checkbox border-base-100 bg-base-300 checked:bg-green-500 checked:text-green-800 checked:border-green-500 "
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Song</span>
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <LuUpload className="w-8 h-8" />
                  <span>Click to upload or drag and drop</span>
                  <input type="file" className="hidden" accept="audio/*" />
                </label>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog" className="space-x-2">
                <button className="btn">Cancel</button>
                <button
                  className="btn btn-soft btn-success"
                  type="submit"
                  disabled={isPending || !songFormData}
                >
                  <span className="flex items-center gap-3">
                    {isPending ? (
                      <div className="flex justify-center items-center">
                        <Loader />
                      </div>
                    ) : (
                      "Add Song"
                    )}
                  </span>
                </button>
              </form>
            </div>

            <ErrorThrower
              isError={isError}
              error={{
                message: error?.toString() || "An Unexpected error occurred",
              }}
            />
          </form>
        </div>
      </dialog>

      {/* Add Album Modal */}
      <dialog id="add_album_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Add New Album</h3>
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Album Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter album title"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Artist</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Select artist
                </option>
                {/* We'll populate this dynamically */}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Album Cover</span>
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <LuUpload className="w-8 h-8" />
                  <span>Click to upload or drag and drop</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog" className="space-x-2">
                <button className="btn">Cancel</button>
                <button className="btn btn-soft btn-success" type="submit">
                  <span className="flex items-center gap-3">Add Album</span>
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AdminModals;
