import React from "react";

import MarkdownIt from 'markdown-it';
// @ts-ignore
import mdit from 'markdown-it-texmath';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { defaultFormulaRenderer } from "./Cell";
import { FormulaOptions } from "types";
import { replaceForKatex } from "../utils";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
};

export const Markdown: React.FC<Props> = ({ text, formulaOptions }) => {
  const { renderer = defaultFormulaRenderer } = formulaOptions;
  const mdi = new MarkdownIt();
  if (renderer === "mathjax") {
    return (<MathJaxContext {...formulaOptions.mathjaxContextProps}>
      <MathJax {...formulaOptions.mathjaxProps}><div dangerouslySetInnerHTML={{ __html: mdi.render(text) }}></div></MathJax>
    </MathJaxContext>);
  }
  // katex
  mdi.use(mdit, { engine: require('katex'), delimiters: 'dollars', ...formulaOptions.katex });
  return (<div dangerouslySetInnerHTML={{ __html: mdi.render(replaceForKatex(text)) }}></div>);
};
