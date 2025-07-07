import useAudioPlayer from "../stores/useAudioPlayer";

const ArtistDetailsCard = () => {
  const isFollowing = false;
  const { currentSong } = useAudioPlayer();
  return (
    <div className="card bg-[#1E1F1E] w-full shadow-sm cursor-pointer">
      <figure className="relative">
        <img src={currentSong?.artists[0].cover} alt="cover-img" />
        <h1 className="absolute top-[5%] left-[8%] text-lg font-bold text-white">
          About the artist
        </h1>
      </figure>
      <div className="flex flex-col p-4 space-y-3 items-start">
        <div className="space-y-1">
          <h2 className="card-title">{currentSong?.artists[0].artist}</h2>
          <div className="flex justify-between">
            <p className="font-bold text-lg text-[#B0B1B0]">
              {currentSong?.artists[0].monthlyListeners} monthly listeners
            </p>
            <button className="bg-transparent border-2 border-[#B0B1B0] w-[7rem] h-[3rem] rounded-full cursor-pointer text-white font-bold text-md hover:border-white hover:scale-110 transition-transform duration-300">
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
        <div className="card-actions justify-start">
          <p className="font-semibold text-md text-[#B0B1B0] line-clamp-8">
            {currentSong?.artists[0].bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailsCard;
