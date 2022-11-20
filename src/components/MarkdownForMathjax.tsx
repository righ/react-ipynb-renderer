import React from "react";

import MarkdownIt, { Options as MarkdownItOptions } from "markdown-it";
// @ts-ignore
import mdim from "markdown-it-mathjax3";
import {HtmlFilter} from "../types";

export type FormulaOptionsForMathjax = {
  mathjax3?: {
    // https://docs.mathjax.org/en/v3.0-latest/options/input/tex.html
    tex?: any;
    svg?: any;
  };
};

type MarkdownProps = {
  text: string;
  formulaOptions: FormulaOptionsForMathjax;
  mdiOptions: MarkdownItOptions;
  htmlFilter: HtmlFilter;
};

export const MarkdownForMathjax: React.FC<MarkdownProps> = ({
  text,
  mdiOptions,
  formulaOptions,
  htmlFilter,
}) => {
  const mdi = new MarkdownIt(mdiOptions);
  mdi.use(mdim, {
    ...formulaOptions.mathjax3,
  });
  const html = mdi.render(text)
  return <div dangerouslySetInnerHTML={{ __html: htmlFilter(html) }}></div>;
};
