import React from "react";
import { Options as MarkdownItOptions } from "markdown-it";

export type OutputType = {
  data?: {
    "text/plain"?: string[];
    "text/html"?: string[];
    "text/latex"?: string[];
    "image/png"?: string;
    "image/jpeg"?: string;
    "image/gif"?: string;
    "image/svg+xml"?: string;
    "application/javascript"?: string[];
  };
  output_type?: string;
  png?: string;
  jpeg?: string;
  gif?: string;
  svg?: string;
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
export type LanguageType = "python" | "r" | "julia" | "haskell" | "ruby";

export type HtmlFilter = (html: string) => string;

export type BaseProps = {
  ipynb: {
    cells: CellType[];
    worksheets?: { cells: CellType[] }[];
  };
  syntaxTheme?: SyntaxThemeType;
  language?: LanguageType;
  bgTransparent?: boolean;
  mdiOptions?: MarkdownItOptions;
  htmlFilter?: HtmlFilter;
  seqAsExecutionCount?: boolean;
};

export type MarkdownProps = {
  className: string;
  text: string;
};

export type ContextType = {
  syntaxTheme: SyntaxThemeType;
  language: LanguageType;
  bgTransparent: boolean;
  Markdown: React.FC<MarkdownProps>;
  mdiOptions: MarkdownItOptions;
  htmlFilter: HtmlFilter;
  formulaOptions: any;
  seqAsExecutionCount: boolean;
};
