"use client";

import { useState } from "react";

// 1. The F1 Keyword Dictionary (Expand as needed)
const F1_KEYWORDS = [
  // Drivers
  "verstappen",
  "max",
  "hamilton",
  "lewis",
  "leclerc",
  "charles",
  "russell",
  "george",
  "norris",
  "lando",
  "piastri",
  "oscar",
  "alonso",
  "fernando",
  "stroll",
  "lance",
  "gasly",
  "pierre",
  "ocon",
  "esteban",
  "albon",
  "alex",
  "sainz",
  "carlos",
  "tsunoda",
  "yuki",
  "lawson",
  "liam",
  "bearman",
  "ollie",
  "antonelli",
  "kimi",
  "doohan",
  "jack",
  "bortoleto",
  "gabriel",
  "hadjar",
  "isack",
  "ricciardo",
  "daniel",
  "perez",
  "checo",
  "hulkenberg",
  "nico",
  "bottas",
  "valtteri",
  "zhou",
  "guanyu",
  // Teams
  "red bull",
  "rbr",
  "mercedes",
  "merc",
  "ferrari",
  "scuderia",
  "mclaren",
  "aston martin",
  "amr",
  "alpine",
  "williams",
  "haas",
  "audi",
  "sauber",
  "rb",
  "vcarb",
  // Key Figures & Entities
  "horner",
  "wolff",
  "toto",
  "vasseur",
  "fred",
  "brown",
  "zak",
  "stella",
  "krack",
  "famin",
  "owles",
  "komatsu",
  "binotto",
  "wheatley",
  "newey",
  "adrian",
  "ben sulayem",
  "mohammed",
  "fia",
  "fom",
  "liberty",
  "domenicali",
  "stefano",
  // Circuits / Countries
  "bahrain",
  "sakhir",
  "saudi",
  "jeddah",
  "australia",
  "melbourne",
  "japan",
  "suzuka",
  "china",
  "shanghai",
  "miami",
  "imola",
  "emilia romagna",
  "monaco",
  "monte carlo",
  "canada",
  "montreal",
  "spain",
  "barcelona",
  "austria",
  "spielberg",
  "red bull ring",
  "britain",
  "silverstone",
  "hungary",
  "hungaroring",
  "belgium",
  "spa",
  "netherlands",
  "zandvoort",
  "italy",
  "monza",
  "azerbaijan",
  "baku",
  "singapore",
  "marina bay",
  "usa",
  "austin",
  "cota",
  "mexico",
  "mexico city",
  "brazil",
  "interlagos",
  "sao paulo",
  "vegas",
  "las vegas",
  "qatar",
  "lusail",
  "abudhabi",
  "yas marina",
  "madrid",
];

// Types
type PredictionItem = {
  prediction: string;
  keywordFound: string | null;
};

type PredictionMap = {
  tier1: PredictionItem[];
  tier2: PredictionItem[];
  tier3: PredictionItem[];
  tier4: PredictionItem[];
  [key: string]: PredictionItem[]; // Index signature for dynamic access
};

export const usePredictionParser = () => {
  const [error, setError] = useState<string | null>(null);

  const parseAndValidate = (text: string, username: string) => {
    setError(null);

    // Initialize empty structure
    const result: PredictionMap = {
      tier1: [],
      tier2: [],
      tier3: [],
      tier4: [],
    };

    const lines = text.split("\n");
    let currentTier = 0;

    // Regex to catch "// TIER 1", "// TIER 2", etc.
    const tierRegex = /\/\/\s*TIER\s*(\d+)/i;

    lines.forEach((line) => {
      const trimmed = line.trim();

      // 1. Check for Tier Switch
      const tierMatch = trimmed.match(tierRegex);
      if (tierMatch) {
        currentTier = parseInt(tierMatch[1], 10);
        return; // Skip the header line itself
      }

      // 2. Check for Bullet Points
      if (trimmed.startsWith("-")) {
        // Validation: Ensure we are inside a valid tier (1-4)
        if (currentTier < 1 || currentTier > 4) return;

        // Clean the prediction text (remove the dash)
        const content = trimmed.substring(1).trim();
        if (!content) return; // Skip empty bullets like "- "

        // Find keyword
        const lowerContent = content.toLowerCase();
        const keyword =
          F1_KEYWORDS.find((kw) => lowerContent.includes(kw)) || null;

        // Add to result
        result[`tier${currentTier}`].push({
          prediction: content,
          keywordFound: keyword,
        });
      }
      // 3. Handle Multi-line (continuation)
      else if (
        currentTier > 0 &&
        trimmed.length > 0 &&
        !trimmed.startsWith("//")
      ) {
        // Get the last added prediction in this tier
        const currentList = result[`tier${currentTier}`];
        if (currentList.length > 0) {
          const lastItem = currentList[currentList.length - 1];
          // Append this line to it
          lastItem.prediction += " " + trimmed;
          // Re-check keyword (in case the keyword was on the second line)
          if (!lastItem.keywordFound) {
            lastItem.keywordFound =
              F1_KEYWORDS.find((kw) =>
                lastItem.prediction.toLowerCase().includes(kw),
              ) || null;
          }
        }
      }
    });

    // --- VALIDATION PHASE ---

    // Check 1: Exact Counts
    for (let i = 1; i <= 4; i++) {
      const count = result[`tier${i}`].length;
      if (count !== 4) {
        setError(`Tier ${i} has ${count} predictions. It must have exactly 4.`);
        return null;
      }
    }

    // Check 2: Keywords
    for (let i = 1; i <= 4; i++) {
      const items = result[`tier${i}`];
      for (const item of items) {
        if (!item.keywordFound) {
          setError(
            `Prediction "${item.prediction.substring(0, 20)}..." in Tier ${i} is too vague. Mention a Driver, Team, or Track.`,
          );
          return null;
        }
      }
    }

    // If all good, return the final object
    return {
      [username]: result,
    };
  };

  return { parseAndValidate, error };
};
