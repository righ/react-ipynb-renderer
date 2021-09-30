import React from "react";

import MarkdownIt from 'markdown-it';
// @ts-ignore
import mdit from 'markdown-it-texmath';
import { FormulaOptions } from "types";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
};

const mdi = new MarkdownIt();

export const MarkdownForKatex: React.FC<Props> = ({ text, formulaOptions }) => {
  mdi.use(mdit, { engine: require('katex'), delimiters: 'dollars', ...formulaOptions.katex });
  return (<div dangerouslySetInnerHTML={{ __html: mdi.render(replaceForKatex(text)) }}></div>);
};

const replaceForKatex = (text: string) => {
  return text
    .replace(/\\\\begin\{eqnarray\}/g, "\\begin{aligned}")
    .replace(/\\\\end\{eqnarray\}/g, "\\end{aligned}")
    ;
};