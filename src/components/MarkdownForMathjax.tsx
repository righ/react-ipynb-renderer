import React from "react";

import MarkdownIt from 'markdown-it';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { FormulaOptions } from "types";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
};

export const MarkdownForMathjax: React.FC<Props> = ({ text, formulaOptions }) => {
  const mdi = new MarkdownIt();
  return (<MathJaxContext {...formulaOptions.mathjaxContextProps}>
    <MathJax {...formulaOptions.mathjaxProps}><div dangerouslySetInnerHTML={{ __html: mdi.render(text) }}></div></MathJax>
  </MathJaxContext>);
};
