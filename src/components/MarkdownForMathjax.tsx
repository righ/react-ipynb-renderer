import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";


import { MarkdownProps } from "../types";
import { Context } from "../context";
import {remarkLatexEnvironment} from "../markdown";

export type FormulaOptionsForMathjax = {
  mathjax3?: {
    // https://docs.mathjax.org/en/v3.0-latest/options/input/tex.html
    tex?: any;
    svg?: any;
  };
};

export const MarkdownForMathjax: React.FC<MarkdownProps> = ({
  className,
  text,
}) => {
  const {
    formulaOptions,
    mdiOptions,
    htmlFilter,
  } = React.useContext(Context);

  const displayMath = [
    ["$$", "$$"],
    ["\\[", "\\]"],
    ["\\begin{equation}", "\\end{equation}"],
  ]


  return (<div className={className}>
    <ReactMarkdown
      remarkPlugins={[[remarkMath, {}], [remarkLatexEnvironment, {}], remarkGfm]}
      rehypePlugins={[[rehypeMathJax, {tex: {displayMath}}], rehypeRaw]}
    >
      {htmlFilter(text)}
    </ReactMarkdown>
  </div>);
};
