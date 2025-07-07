import { FaPlay } from "react-icons/fa";
import useAudioPlayer from "../stores/useAudioPlayer";
import { Song } from "../types/songs";

const MediaComponent = () => {
  const { playSong, queueContext, queue } = useAudioPlayer();
  const handlePlaySong = (song: Song, index: number) => {
    playSong(song, {
      id: queueContext.slug,
      title: queueContext.title,
      slug: queueContext.slug,
      type: "Playlist",
      songs: queueContext.songs,
    });
    console.log(index);
  };

  return (
    <div className="group flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition relative cursor-pointer">
      {/* Cover mit Play-Button */}
      <div className="relative w-14 h-14">
        <img
          src={queue[0].logo}
          alt={`${queue[0].title}-cover`}
          className={`w-full h-full object-cover rounded-md`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition`}
        >
          <button
            className="text-white rounded-full p-2 cursor-pointer"
            onClick={() => handlePlaySong(queue[0], 0)}
          >
            <FaPlay className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Song-Info */}
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium">{queue[0].title}</p>
        <p className="truncate text-sm text-zinc-400">Single</p>
      </div>

      {/* Mehr-Optionen-Button
      {item.type === "queue" && (
        <button className="opacity-0 group-hover:opacity-100 transition cursor-pointer">
          <SlOptions className="w-5 h-5 text-zinc-400 hover:text-white" />
        </button>
      )} */}
    </div>
  );
};

export default MediaComponent;
