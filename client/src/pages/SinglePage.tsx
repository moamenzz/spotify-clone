import { useEffect, useState } from "react";
import { extractColorFromImage } from "../utils/colorUtils";
import InteractionButtons from "../components/InteractionButtons";
import SongList from "../components/SongList";
import { useQuery } from "@tanstack/react-query";
import { getSong } from "../lib/apiRoutes";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorThrower from "../components/ErrorThrower";
import { QueueContext } from "../stores/useAudioPlayer";

const SinglePage = () => {
  const [coverColor, setCoverColor] = useState("#292929");
  const { slug } = useParams();

  const {
    data: single,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["single"],
    queryFn: () => getSong(slug || ""),
  });

  const context: QueueContext = {
    id: single?.id || "1",
    title: single?.title || "unknown",
    slug: single?.slug || "unknown",
    type: "Single",
    songs: single ? [single] : [],
  };

  useEffect(() => {
    let isMounted = true;

    const loadColor = async () => {
      try {
        const color = await extractColorFromImage(single?.logo || "");
        if (isMounted) {
          setCoverColor(color);
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
  }, [single?.logo, setCoverColor]);

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower error={error} isError={isError} />
  ) : (
    <div className="min-h-screen bg-[#131312]">
      {/* Single cover */}
      <div
        className={`w-full h-[20rem] mx-auto`}
        style={{
          background: `linear-gradient(180deg, ${coverColor} 95%, #131312 100%)`,
        }}
      >
        {/* Single details */}
        <div className="flex px-10 py-8 gap-6">
          {/* Icon */}
          <div className="w-60 h-60 shadow-2xl">
            <img
              src={single?.logo}
              alt={`${single?.title}-cover`}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col mt-16 space-y-1">
            <p className="text-md font-semibold text-white">Single</p>
            <h1 className="font-bold text-7xl text-white">{single?.title}</h1>
            <p className="text-sm font-bold text-[#888989] pt-3 flex items-center">
              {single?.artists.map((artist, index) => (
                <span key={index} className="inline-flex items-center gap-1">
                  <span className="w-7 h-7">
                    <img
                      src={artist.cover}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </span>
                  {artist.artist}
                  {index < single.artists.length - 1 && ", "}
                </span>
              ))}{" "}
              · {single?.createdAt?.toLocaleString()} · 1 song,{" "}
              {single?.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Interaction Buttons */}
      <InteractionButtons
        type="single/album"
        previewImage={single?.logo}
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
      <div className="px-6 w-full">
        <SongList
          type="Album/Single"
          songs={single ? [single] : []}
          showHeader={true}
          context={context}
        />
      </div>

      {/* <div className="flex flex-col px-6 space-y-6 py-16">
        <div className="flex justify-between items-center">
          <h1 className="text-white font-bold text-2xl">
            {" "}
            More by {album?.artists[0].artist}
          </h1>
          <p className="text-[#B0B1B0] font-semibold hover:underline cursor-pointer">
            See Discography
          </p>
        </div>

        <div className="flex space-x-3">
          {mockArtist.featuredOn.map((playlist, index) => (
            <div
              className="relative flex flex-col space-y-3 group p-2 min-w-[180px] max-w-[200px] rounded-md hover:bg-[#282828] cursor-pointer"
              key={index}
            >
              <img
                src={playlist.cover}
                alt={`${playlist.title} cover`}
                className="w-48 h-42 object-cover aspect-video rounded-lg"
              />
              <div>
                <p className="text-md font-semibold text-white">
                  {playlist.title}
                </p>
                <p className="text-sm font-semibold text-[#B2B2B3]">
                  {Array.isArray(playlist.bioOrArtists)
                    ? playlist.bioOrArtists.slice(0, 3).join(", ")
                    : playlist.bioOrArtists}
                  {Array.isArray(playlist.bioOrArtists) &&
                    playlist.bioOrArtists.length > 3 &&
                    ` and more`}
                </p>
              </div>
              <div className="absolute right-4 bottom-22 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <button className="bg-green-500 rounded-full p-3.5 shadow-lg hover:bg-green-400 hover:scale-105 transition-all translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer">
                  <FaPlay size={20} className="text-black" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default SinglePage;
