import { create } from "zustand";
import { Song } from "../types/songs";

export interface QueueContext {
  id: string | null;
  title: string | null;
  slug: string | null;
  type: "Playlist" | "Album" | "Artist" | "Single" | null;
  songs: Song[];
}

interface AudioPlayerState {
  // Aktueller Zustand
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: "off" | "all" | "one";

  // Audio Element Refernz
  audioElement: HTMLAudioElement | null;

  // Queue
  queueContext: QueueContext;
  queue: Song[];
  setQueueContext: (context: QueueContext) => void;
  fillQueueFromContext: () => void;

  // Aktionen
  initializeAudio: () => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  playSong: (song: Song, context?: QueueContext) => void;
  playNext: () => void;
  playPrevious: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  toggleShuffle: () => void;
  setRepeat: (mode: "off" | "all" | "one") => void;
  updateProgress: (progress: number) => void;
}

const storedSong = "spotify-clone-current-song";
const storedContext = "spotify-clone-current-context";
const STORED_KEYS = {
  VOLUME: "spotify-clone-volume",
  SHUFFLE: "spotify-clone-shuffle",
  REPEAT: "spotify-clone-repeat",
  PROGRESS: "spotify-clone-progress",
};

const getStoredSong = (): Song | null => {
  const song = localStorage.getItem(storedSong);
  return song ? JSON.parse(song) : null;
};

const getStoredContext = (): QueueContext => {
  const context = localStorage.getItem(storedContext);
  return context
    ? JSON.parse(context)
    : {
        type: null,
        id: null,
        title: null,
        slug: null,
        artist: null,
        artistCover: undefined,
        songs: [],
      };
};

const getStoredValue = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const useAudioPlayer = create<AudioPlayerState>()((set, get) => ({
  currentSong: getStoredSong(),
  queue: [],
  isPlaying: false,
  volume: getStoredValue(STORED_KEYS.VOLUME, 50),
  progress: getStoredValue(STORED_KEYS.PROGRESS, 0),
  duration: 0,
  shuffle: getStoredValue(STORED_KEYS.SHUFFLE, false),
  repeat: getStoredValue(STORED_KEYS.REPEAT, "off"),
  audioElement: null,
  queueContext: getStoredContext(),

  initializeAudio: () => {
    if (get().audioElement) return;
    const audio = new Audio();

    const savedVolume = getStoredValue(STORED_KEYS.VOLUME, 50);
    if (savedVolume) {
      audio.volume = savedVolume / 100;
    }

    set({ audioElement: audio });

    audio.addEventListener("timeupdate", () => {
      set({ progress: audio.currentTime });
    });

    audio.addEventListener("loadedmetadata", () => {
      set({ duration: audio.duration });
    });

    audio.addEventListener("ended", () => {
      const state = get();
      if (state.repeat === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        state.playNext();
      }
    });
  },

  // Song-Funktionen

  play: () => {
    const { audioElement, currentSong } = get();

    if (currentSong && audioElement && !audioElement.src) {
      const audio = audioElement as HTMLAudioElement;
      audio.src = currentSong.url;
      audio.load();

      const savedProgress = getStoredValue(STORED_KEYS.PROGRESS, 0);
      if (savedProgress > 0) {
        audio.currentTime = savedProgress;
      }
    }

    if (audioElement) {
      audioElement
        .play()
        .then(() => {
          set({ isPlaying: true });
        })
        .catch((err) => {
          console.error("Fehler beim Abspielen:", err);
        });
    }
  },

  pause: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      set({ isPlaying: false });
    }
  },

  togglePlay: () => {
    const { isPlaying } = get();
    if (isPlaying) {
      get().pause();
    } else {
      get().play();
    }
  },

  setVolume: (volume: number) => {
    const { audioElement } = get();
    // Volumen zwischen 0 und 1 begrenzen
    const clampedVolume = Math.max(0, Math.min(100, volume));

    if (audioElement) {
      audioElement.volume = clampedVolume / 100; // Audio-Element erwartet Werte zwischen 0 und 1
    }
    localStorage.setItem(STORED_KEYS.VOLUME, JSON.stringify(clampedVolume));
    set({ volume: clampedVolume });
  },

  seek: (time: number) => {
    const { audioElement, duration } = get();
    if (audioElement) {
      // Wenn time als Prozent (0-100) übergeben wird, konvertieren wir zu Sekunden
      const seekTime = time > 1 ? (time / 100) * duration : time;

      // Zeit zwischen 0 und Dauer begrenzen
      const clampedTime = Math.max(0, Math.min(duration, seekTime));
      audioElement.currentTime = clampedTime;

      localStorage.setItem(STORED_KEYS.PROGRESS, JSON.stringify(clampedTime));
      set({ progress: clampedTime });
    }
  },

  setRepeat: (mode: "off" | "all" | "one") => {
    localStorage.setItem(STORED_KEYS.REPEAT, JSON.stringify(mode));
    set({ repeat: mode });
  },

  updateProgress: (time: number) => {
    set({ progress: time });
  },

  // Queue-Funktionen

  playSong: (song: Song, context?: QueueContext) => {
    const { audioElement } = get();
    if (!audioElement) {
      get().initializeAudio();
    }
    localStorage.setItem(STORED_KEYS.PROGRESS, JSON.stringify(0));

    set({ currentSong: song, progress: 0 });
    localStorage.setItem(storedSong, JSON.stringify(song)); // Speichern des aktuellen Songs in localStorage

    if (context) {
      const { setQueueContext, fillQueueFromContext } = get();
      setQueueContext(context);
      fillQueueFromContext();
    }

    const audio = get().audioElement;
    if (audio && song.url) {
      audio.src = song.url;
      audio.load();
      get().play();
    }
  },

  // TODO: Fix context not getting saved
  setQueueContext: (context: QueueContext) => {
    set({ queueContext: context });
    localStorage.setItem(storedContext, JSON.stringify(context));
  },

  fillQueueFromContext: () => {
    const { queueContext, currentSong, shuffle } = get();

    if (!queueContext.songs.length || !currentSong) return;

    // Finde Index des aktuellen Songs
    const currentIndex = queueContext.songs.findIndex(
      (song) => song.id === currentSong.id
    );

    // Wenn das aktuellen Song ein Single ist, dann return
    if (currentIndex === -1) return;

    // Hole alle Songs nach dem aktuellen aus dem Kontext
    let nextSongs = queueContext.songs.slice(currentIndex + 1);

    // Wenn shuffle aktiviert ist, Songs mischen
    if (shuffle) {
      nextSongs = [...nextSongs].sort(() => Math.random() - 0.5);
    }

    // Queue Setzen
    set({ queue: nextSongs });
  },

  playNext: () => {
    const { queue, currentSong, shuffle, repeat, queueContext } = get();

    if (queue.length === 0) {
      // Wenn die Queue leer ist und repeat all aktiv ist, starte von vorne
      if (repeat === "all" && queueContext.songs.length > 0) {
        // Bei repeat all und leerem Queue, den ersten Song des Kontexts abspielen
        const songToPlay = shuffle
          ? queueContext.songs[
              Math.floor(Math.random() * queueContext.songs.length)
            ]
          : queueContext.songs[0];

        get().playSong(songToPlay);

        // Queue mit restlichen Songs füllen (außer dem gerade gespielten)
        const remainingSongs = queueContext.songs.filter(
          (song) => song.id !== songToPlay.id
        );
        set({
          queue: shuffle
            ? [...remainingSongs].sort(() => Math.random() - 0.5)
            : remainingSongs,
        });
      } else if (currentSong && repeat === "one") {
        // Bei repeat one einfach den aktuellen Song wiederholen
        get().playSong(currentSong);
      } else {
        get().pause();
        set({ isPlaying: false });
      }
      return;
    }

    let nextSongIndex = 0;
    if (shuffle) {
      // Zufälligen Song aus der Queue wählen
      nextSongIndex = Math.floor(Math.random() * queue.length);
    }

    const nextSong = queue[nextSongIndex];

    // Song aus der Queue entfernen und abspielen
    const newQueue = [...queue];
    newQueue.splice(nextSongIndex, 1);

    set({ queue: newQueue });
    get().playSong(nextSong);
  },

  playPrevious: () => {
    const { audioElement, currentSong, queueContext, fillQueueFromContext } =
      get();

    // Wenn weniger als 3 Sekunden gespielt wurden, zum Anfang zurückkehren
    if (
      audioElement &&
      audioElement.currentTime <= 3 &&
      currentSong &&
      queueContext.songs.length > 0
    ) {
      // Finde Index
      const currentIndex = queueContext.songs.findIndex(
        (song) => song.id === currentSong.id
      );

      // Wenn Index großer als 0 ist, dann gibt es ein vorherigen Song
      if (currentIndex > 0) {
        const previousSong = queueContext.songs[currentIndex - 1];
        get().playSong(previousSong);
        fillQueueFromContext();
        return;
      }
    }

    if (currentSong && audioElement) {
      audioElement.currentTime = 0;
      get().play();
    }
  },

  addToQueue: (song: Song) => {
    set((state) => ({
      queue: [...state.queue, song],
    }));
  },

  removeFromQueue: (index: number) => {
    set((state) => {
      const newQueue = [...state.queue];
      newQueue.splice(index, 1);
      return { queue: newQueue };
    });
  },

  clearQueue: () => {
    set({ queue: [] });
  },

  toggleShuffle: () => {
    set((state) => {
      // Aktualisiere auch die Queue basierend auf dem neuen Shuffle-Status
      const newShuffleState = !state.shuffle;

      // Wenn ein Kontext gesetzt ist, Queue neu generieren
      if (state.queueContext.songs.length > 0 && state.currentSong) {
        const currentIndex = state.queueContext.songs.findIndex(
          (song) => song.id === state.currentSong?.id
        );

        if (currentIndex !== -1) {
          let remainingSongs = state.queueContext.songs.slice(currentIndex + 1);

          if (newShuffleState) {
            remainingSongs = [...remainingSongs].sort(
              () => Math.random() - 0.5
            );
          }

          return {
            shuffle: newShuffleState,
            queue: remainingSongs,
          };
        }
      }

      localStorage.setItem(
        STORED_KEYS.SHUFFLE,
        JSON.stringify(newShuffleState)
      );
      return { shuffle: newShuffleState };
    });
  },
}));

export default useAudioPlayer;
