export type OutputType = {
  data?: {
    "text/plain"?: string[];
    "text/html"?: string[];
    "text/latex"?: string[];
    "image/png"?: string;
    "application/javascript"?: string[];
  };
  output_type?: string;
  execution_count?: number;
  metadata?: {
    scrolled?: boolean;
  },
};

export type CellType = {
  cell_type?: string;
  execution_count?: number | null;
  source?: string[];
  outputs?: OutputType[],
};

export type SyntaxThemeType = "atomDark" | "cb" | "coy" | "darcula" | "dark" | "duotoneDark" | "duotoneEarth" | "duotoneForest" | "duotoneLight" | "duotoneSea" | "duotoneSpace" | "funky" | "ghcolors" | "hopscotch" | "okaidia" | "pojoaque" | "prism" | "solarizedlight" | "tomorrow" | "twilight" | "vscDarkPlus" | "xonokai";
export type LanguageType = "python" | "r";

