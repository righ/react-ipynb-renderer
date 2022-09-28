import React from "react";

import MarkdownIt, { Options as MarkdownItOptions } from "markdown-it";
// @ts-ignore
import mdim from "markdown-it-mathjax3";

export type FormulaOptionsForMathjax = {
  mathjax3?: {
    // https://docs.mathjax.org/en/v3.0-latest/options/input/tex.html
    tex?: any;
    svg?: any;
  };
};

type Props = {
  text: string;
  formulaOptions: FormulaOptionsForMathjax;
  mdiOptions: MarkdownItOptions;
};

export const MarkdownForMathjax: React.FC<Props> = ({
  text,
  mdiOptions,
  formulaOptions,
}) => {
  const mdi = new MarkdownIt(mdiOptions);
  mdi.use(mdim, {
    ...formulaOptions.mathjax3,
  });

  return <div dangerouslySetInnerHTML={{ __html: mdi.render(text) }}></div>;
};
