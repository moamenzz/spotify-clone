import { create } from "zustand";

interface UIState {
  showViewPlayer: boolean;
  showSidebar: boolean;
  showQueue: boolean;
  activeTab: "Queue" | "Recently-Played";
  browseActiveTab: "" | "Songs" | "Artists" | "Albums";
  adminActiveTab: "Songs" | "Albums";
  hoverColor: string;
  playlistCoverColor: string;
  setHoverColor: (color: string) => void;
  setPlaylistCoverColor: (color: string) => void;
  setViewPlayer: (show: boolean) => void;
  setSidebar: (show: boolean) => void;
  setQueue: (show: boolean) => void;
  setActiveTab: (activeTab: "Queue" | "Recently-Played") => void;
  setBrowseActiveTab: (
    browseActiveTab: "Songs" | "Artists" | "Albums" | ""
  ) => void;
  setAdminActiveTab: (adminActiveTab: "Songs" | "Albums") => void;

  // Feed

  madeForYou: boolean;
  trendingAlbumsAndSingles: boolean;
  recentlyPlayed: boolean;
  discoverPicksForYou: boolean;
  yourTopMixes: boolean;
  jumpBackIn: boolean;
  episodesForYou: boolean;
  bestOfArtists: boolean;
  setMadeForYou: (show: boolean) => void;
  setTrendingAlbumsAndSingles: (show: boolean) => void;
  setRecentlyPlayed: (show: boolean) => void;
  setDiscoverPicksForYou: (show: boolean) => void;
  setYourTopMixes: (show: boolean) => void;
  setJumpBackIn: (show: boolean) => void;
  setEpisodesForYou: (show: boolean) => void;
  setBestOfArtists: (show: boolean) => void;
}

const STORED_KEYS = {
  VIEWPLAYER: "spotify_clone_view_player",
  SIDEBAR: "spotify_clone_sidebar",
  QUEUE: "spotify_clone_queue",
};

const getStoredValue = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const useUIStore = create<UIState>((set) => ({
  showViewPlayer: getStoredValue(STORED_KEYS.VIEWPLAYER, false),
  showSidebar: getStoredValue(STORED_KEYS.SIDEBAR, true),
  showQueue: getStoredValue(STORED_KEYS.QUEUE, false),
  activeTab: "Queue",
  browseActiveTab: "",
  adminActiveTab: "Songs",
  hoverColor: "",
  playlistCoverColor: "",
  setHoverColor: (color: string) => set({ hoverColor: color }),
  setPlaylistCoverColor: (color: string) => set({ playlistCoverColor: color }),
  setViewPlayer: (show: boolean) => {
    set({ showViewPlayer: show });
    localStorage.setItem(STORED_KEYS.VIEWPLAYER, JSON.stringify(show));
  },
  setSidebar: (show: boolean) => {
    set({ showSidebar: show });
    localStorage.setItem(STORED_KEYS.SIDEBAR, JSON.stringify(show));
  },
  setQueue: (show: boolean) => {
    set({ showQueue: show });
    localStorage.setItem(STORED_KEYS.QUEUE, JSON.stringify(show));
  },
  setActiveTab: (activeTab: "Queue" | "Recently-Played") => set({ activeTab }),
  setBrowseActiveTab: (browseActiveTab: "Songs" | "Artists" | "" | "Albums") =>
    set({ browseActiveTab }),
  setAdminActiveTab: (adminActiveTab: "Songs" | "Albums") =>
    set({ adminActiveTab }),

  // Feed

  madeForYou: true,
  trendingAlbumsAndSingles: true,
  recentlyPlayed: true,
  discoverPicksForYou: true,
  yourTopMixes: true,
  jumpBackIn: true,
  episodesForYou: true,
  bestOfArtists: true,
  setMadeForYou: (show: boolean) => set({ madeForYou: show }),
  setTrendingAlbumsAndSingles: (show: boolean) =>
    set({ trendingAlbumsAndSingles: show }),
  setRecentlyPlayed: (show: boolean) => set({ recentlyPlayed: show }),
  setDiscoverPicksForYou: (show: boolean) => set({ discoverPicksForYou: show }),
  setYourTopMixes: (show: boolean) => set({ yourTopMixes: show }),
  setJumpBackIn: (show: boolean) => set({ jumpBackIn: show }),
  setEpisodesForYou: (show: boolean) => set({ episodesForYou: show }),
  setBestOfArtists: (show: boolean) => set({ bestOfArtists: show }),
}));

export default useUIStore;
