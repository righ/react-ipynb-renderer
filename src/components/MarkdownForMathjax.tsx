import React from "react";

import { MathpixMarkdown, MathpixLoader, } from 'mathpix-markdown-it';
import { FormulaOptions } from "types";

type Props = {
  text: string;
  formulaOptions: FormulaOptions;
};

export const MarkdownForMathjax: React.FC<Props> = ({ text, formulaOptions }) => {
  return (<MathpixLoader>
    <MathpixMarkdown {...formulaOptions?.mathjax?.markdown} text={text} />
  </MathpixLoader>);
};
