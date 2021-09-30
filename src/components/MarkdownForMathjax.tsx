import React from "react";

import MarkdownIt from 'markdown-it';
// @ts-ignore
import mdim from 'markdown-it-mathjax3';
import { FormulaOptions } from "../types";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
};

const mdi = new MarkdownIt();
mdi.use(mdim);

export const MarkdownForMathjax: React.FC<Props> = ({ text, formulaOptions }) => {

  return (<div dangerouslySetInnerHTML={{ __html: mdi.render(text) }}></div>);
};