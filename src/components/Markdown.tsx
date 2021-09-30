import React from "react";

import { defaultFormulaRenderer } from "./Cell";
import { MarkdownForKatex } from "./MarkdownForKatex";
import { MarkdownForMathjax } from "./MarkdownForMathjax";
import { FormulaOptions } from "types";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
};

export const Markdown: React.FC<Props> = ({ text, formulaOptions }) => {
  const { renderer = defaultFormulaRenderer } = formulaOptions;
  const Md = renderer === "mathjax" ? MarkdownForMathjax : MarkdownForKatex;
  return (<Md text={text} formulaOptions={formulaOptions} />);
};
