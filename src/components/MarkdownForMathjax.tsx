import React from "react";

import MarkdownIt, { Options as MarkdownItOptions } from "markdown-it";
// @ts-ignore
import mdim from "markdown-it-mathjax3";

export type FormulaOptionsForMathjax = {};

type Props = {
  text: string;
  formulaOptions: FormulaOptionsForMathjax;
  mdiOptions: MarkdownItOptions;
};

export const MarkdownForMathjax: React.FC<Props> = ({
  text,
  formulaOptions,
  mdiOptions,
}) => {
  const mdi = new MarkdownIt(mdiOptions);
  mdi.use(mdim);

  return <div dangerouslySetInnerHTML={{ __html: mdi.render(text) }}></div>;
};
