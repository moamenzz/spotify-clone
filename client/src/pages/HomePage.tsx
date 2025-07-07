import FeaturedSongCard from "../components/FeaturedSongCard";
import PlaylistSlider from "../components/PlaylistSlider";
import RecentlyPlayed from "../components/RecentlyPlayed";
import useAuth from "../hooks/useAuth";
import useUIStore from "../stores/useUIStore";
import {
  BestOfArtistsPlaylistItems,
  EpisodesForYouPlaylistItems,
  ForYouPlaylistItems,
  JumpBackInPlaylistitems,
  playlistData,
  RecentlyPlayedPlaylistItems,
  TrendingPlaylistItems,
  YourTopMixesPlaylistItems,
} from "../types/playlist";

const HomePage = () => {
  // const { user } = useAuth();
  const { hoverColor } = useUIStore();
  // console.log("User :", user);

  const {
    madeForYou,
    trendingAlbumsAndSingles,
    recentlyPlayed,
    // discoverPicksForYou,
    yourTopMixes,
    jumpBackIn,
    // episodesForYou,
    bestOfArtists,
  } = useUIStore();

  return (
    // TODO: Create User Onboarding
    <div className="min-h-screen bg-[#131312]">
      <div className="mx-auto relative">
        {/* Ebene 1: Animierte Hintergrundfarbe (volle Deckkraft) */}
        <div
          className="absolute w-full h-[20%] top-0"
          style={{
            backgroundColor: hoverColor || "#292929",
            transition: "background-color 0.7s ease",
          }}
        />

        {/* Ebene 2: Statischer Gradient-Overlay (für den "Abblend"-Effekt) */}
        <div
          className="absolute w-full h-[20%] top-0 opacity-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(19, 19, 18, 1))",
          }}
        />

        <div className="flex flex-col w-full px-16 py-3 space-y-6">
          {/* Featured Song */}
          <div>
            <FeaturedSongCard />
          </div>

          {/* TODO: Add Radio */}
          {/* Categories & Recently played */}
          <div>
            <RecentlyPlayed /> {/* Frequently Played */}
          </div>
          {/* Made for you playlists */}
          {madeForYou && (
            <div>
              <PlaylistSlider<ForYouPlaylistItems>
                value="For-you"
                playlists={playlistData.forYou}
              />
            </div>
          )}

          {/* Trending Albums */}
          {trendingAlbumsAndSingles && (
            <div>
              <PlaylistSlider<TrendingPlaylistItems>
                value="Trending Albums/Singles"
                playlists={playlistData.trending}
              />
            </div>
          )}
          {/* TODO: Add Discover Picks For You */}
          {/* Recently played playlists, artists, songs */}
          {recentlyPlayed && (
            <div>
              <PlaylistSlider<RecentlyPlayedPlaylistItems>
                value="Recently played"
                playlists={playlistData.recentlyPlayed}
              />
            </div>
          )}
          {/* Your top mixes */}
          {yourTopMixes && (
            <div>
              <PlaylistSlider<YourTopMixesPlaylistItems>
                value="Your top mixes"
                playlists={playlistData.topMixes}
              />
            </div>
          )}
          {/* Jump back in */}
          {jumpBackIn && (
            <div>
              <PlaylistSlider<JumpBackInPlaylistitems>
                value="Jump back in"
                playlists={playlistData.jumpBackIn}
              />
            </div>
          )}
          {/* Podcast Episodes for you */}
          {/* {episodesForYou && (
            <div>
              <PlaylistSlider<EpisodesForYouPlaylistItems>
                value="Episodes for you"
                playlists={playlistData.episodesForYou}
              />
            </div>
          )} */}
          {/* Best of artists */}
          {bestOfArtists && (
            <div>
              <PlaylistSlider<BestOfArtistsPlaylistItems>
                value="Best of artists"
                playlists={playlistData.bestOfArtists}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
