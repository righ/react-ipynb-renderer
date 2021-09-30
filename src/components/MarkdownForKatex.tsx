import React from "react";
import 'katex/dist/katex.min.css';

import MarkdownIt from 'markdown-it';
// @ts-ignore
import mdit from 'markdown-it-texmath';
import { FormulaOptions } from "types";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
};

export const MarkdownForKatex: React.FC<Props> = ({ text, formulaOptions }) => {
  const mdi = new MarkdownIt();
  mdi.use(mdit, { engine: require('katex'), delimiters: 'dollars', ...formulaOptions.katex });
  return (<div dangerouslySetInnerHTML={{ __html: mdi.render(replaceForKatex(text)) }}></div>);
};

const replaceForKatex = (text: string) => {
  return text
    .replace(/\\\\begin\{eqnarray\}/g, "\\begin{aligned}")
    .replace(/\\\\end\{eqnarray\}/g, "\\end{aligned}")
    ;
};