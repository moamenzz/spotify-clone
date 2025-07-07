import { FastAverageColor } from "fast-average-color";
// Initialisiere die Bibliothek
const fac = new FastAverageColor();

// Cache für bereits berechnete Farben
const colorCache: Record<string, string> = {};

// Farbe aus Bild extrahieren - VERBESSERTE VERSION
export const extractColorFromImage = async (
  imageUrl: string
): Promise<string> => {
  // Prüfen, ob die Farbe bereits im Cache ist
  if (colorCache[imageUrl]) {
    return colorCache[imageUrl];
  }

  try {
    // Lade das Bild und extrahiere die Farbe
    const color = await fac.getColorAsync(imageUrl);

    // WICHTIG: Speichere nur den Hex-Wert, nicht den vollständigen CSS-Klassennamen
    colorCache[imageUrl] = color.hex;
    return color.hex;
  } catch (error) {
    console.error("Fehler bei der Farbextraktion:", error);
    // Fallback-Farbe bei Fehler
    return "#292929"; //#213123
  }
};
