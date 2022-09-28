import React from "react";
import { KatexOptions } from "katex";

import MarkdownIt, { Options as MarkdownItOptions } from "markdown-it";
// @ts-ignore
import mdit from "markdown-it-texmath";

export type FormulaOptionsForKatex = {
  texmath?: {
    engine?: any;
    // https://github.com/goessner/markdown-it-texmath#features
    delimiters?:
      | "dollars"
      | "brackets"
      | "doxygen"
      | "gitlab"
      | "julia"
      | "kramdown"
      | "beg_end";
    katexOptions?: KatexOptions;
  };
};

type MarkdownProps = {
  text: string;
  formulaOptions: FormulaOptionsForKatex;
  mdiOptions: MarkdownItOptions;
};

export const MarkdownForKatex: React.FC<MarkdownProps> = ({
  text,
  formulaOptions,
  mdiOptions,
}) => {
  const mdi = new MarkdownIt(mdiOptions);
  mdi.use(mdit, {
    engine: require("katex"),
    delimiters: "dollars",
    ...formulaOptions.texmath,
  });
  return (
    <div
      dangerouslySetInnerHTML={{ __html: mdi.render(replaceForKatex(text)) }}
    ></div>
  );
};

const replaceForKatex = (text: string) => {
  return text
    .replace(/\\\\begin\{eqnarray\}/g, "\\begin{aligned}")
    .replace(/\\\\end\{eqnarray\}/g, "\\end{aligned}");
};
