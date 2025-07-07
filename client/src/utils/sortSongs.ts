import { useState } from "react";
import { Song } from "../types/songs";

interface SortConfig {
  field: keyof Song | null;
  direction: "asc" | "desc";
}

export const useSortSongs = (initialSongs: Song[]) => {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: "asc",
  });

  const sortSongs = (field: keyof Song) => {
    const direction =
      sortConfig.field === field && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    const sortedSongs = [...songs].sort((a, b) => {
      if (field === "createdAt") {
        return direction === "asc"
          ? new Date(a[field]).getTime() - new Date(b[field]).getTime()
          : new Date(b[field]).getTime() - new Date(a[field]).getTime();
      }

      if (field === "duration") {
        const aDuration = typeof a.duration === "number" ? a.duration : 0;
        const bDuration = typeof b.duration === "number" ? b.duration : 0;

        return direction === "asc"
          ? aDuration - bDuration
          : bDuration - aDuration;
      }
      if (field === "plays") {
        const aPlays = typeof a.plays === "number" ? a.plays : 0;
        const bPlays = typeof b.plays === "number" ? b.plays : 0;
        return direction === "asc" ? aPlays - bPlays : bPlays - aPlays;
      }

      // Handle string comparisons (title, album)
      const aValue = String(a[field]).toLowerCase();
      const bValue = String(b[field]).toLowerCase();

      if (direction === "asc") {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });

    setSortConfig({ field, direction });
    setSongs(sortedSongs);
  };

  return { songs, sortSongs, sortConfig };
};
