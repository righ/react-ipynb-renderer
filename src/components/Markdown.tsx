import React from "react";
import { Options as MarkdownItOptions } from "markdown-it";

import { defaultFormulaRenderer } from "./Cell";
import { MarkdownForKatex } from "./MarkdownForKatex";
import { MarkdownForMathjax } from "./MarkdownForMathjax";
import { FormulaOptions } from "types";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
  mdiOptions: MarkdownItOptions;
};

export const Markdown: React.FC<Props> = ({
  text,
  formulaOptions,
  mdiOptions,
}) => {
  const { renderer = defaultFormulaRenderer } = formulaOptions;
  const Md = renderer === "mathjax" ? MarkdownForMathjax : MarkdownForKatex;
  return (
    <Md text={text} formulaOptions={formulaOptions} mdiOptions={mdiOptions} />
  );
};
