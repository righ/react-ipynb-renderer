import { Options as MarkdownItOptions } from "markdown-it";

export type OutputType = {
  data?: {
    "text/plain"?: string[];
    "text/html"?: string[];
    "text/latex"?: string[];
    "image/png"?: string;
    "image/jpeg"?: string;
    "image/gif"?: string;
    "application/javascript"?: string[];
  };
  output_type?: string;
  png?: string;
  jpeg?: string;
  gif?: string;
  text?: string[];
  execution_count?: number;
  metadata?: {
    scrolled?: boolean;
  };
};

export type CellType = {
  attachments?: {
    [s: string]: {
      [s: string]: string;
    };
  };
  cell_type?: string;
  execution_count?: number | null;
  prompt_number?: number;
  auto_number?: number;
  source?: string[];
  outputs?: OutputType[];
  input?: string[];
};

export type SyntaxThemeType =
  | "atomDark"
  | "cb"
  | "coy"
  | "darcula"
  | "dark"
  | "duotoneDark"
  | "duotoneEarth"
  | "duotoneForest"
  | "duotoneLight"
  | "duotoneSea"
  | "duotoneSpace"
  | "funky"
  | "ghcolors"
  | "hopscotch"
  | "okaidia"
  | "pojoaque"
  | "prism"
  | "solarizedlight"
  | "tomorrow"
  | "twilight"
  | "vscDarkPlus"
  | "xonokai";
export type LanguageType = "python" | "r" | "julia";

export type BaseProps = {
  ipynb: {
    cells: CellType[];
    worksheets?: { cells: CellType[] }[];
  };
  syntaxTheme?: SyntaxThemeType;
  language?: LanguageType;
  bgTransparent?: boolean;
  mdiOptions?: MarkdownItOptions;
  htmlFilter: (input: string) => string;
};
