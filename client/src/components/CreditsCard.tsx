import useAudioPlayer from "../stores/useAudioPlayer";

const CreditsCard = () => {
  const isFollowing = false;
  const { currentSong } = useAudioPlayer();

  return (
    <div className="card bg-[#1E1F1E] shadow-sm w-full">
      <div className="card-body p-4">
        {/* Card Title */}
        <div className="flex justify-between items-</div>center mb-2">
          <h1 className="text-lg font-bold text-white">Credits</h1>
          <h3 className="text-sm font-normal text-[#B0B1B0] hover:underline hover:text-white transition-colors duration-150 cursor-pointer">
            Show all
          </h3>
        </div>

        <div className="space-y-3">
          {currentSong?.artistsRoles.map((artistRole, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="text-md font-semibold text-white hover:underline cursor-pointer">
                  {artistRole.artist.artist}
                  {/* Access the populated artist's name */}
                </p>

                <p className="text-sm text-gray-400">
                  {artistRole.role}
                  {/* Use the role directly from artistRole */}
                </p>
              </div>
              {/* Follow Button */}
              <button className="bg-transparent border-2 border-[#B0B1B0] w-[5rem] h-[2rem] rounded-full cursor-pointer text-white font-bold text-md hover:border-white hover:scale-110 transition-transform duration-300">
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditsCard;
