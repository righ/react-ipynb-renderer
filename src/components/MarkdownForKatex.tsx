import React from "react";

import MarkdownIt, { Options as MarkdownItOptions } from "markdown-it";
// @ts-ignore
import mdit from "markdown-it-texmath";
import { FormulaOptions } from "types";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
  mdiOptions: MarkdownItOptions;
};

export const MarkdownForKatex: React.FC<Props> = ({
  text,
  formulaOptions,
  mdiOptions,
}) => {
  const mdi = new MarkdownIt(mdiOptions);
  mdi.use(mdit, {
    engine: require("katex"),
    delimiters: "dollars",
    ...formulaOptions.katex,
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
