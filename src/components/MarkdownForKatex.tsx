import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { KatexOptions } from "katex";

import { MarkdownProps } from "../types";
import { Context } from "../context";
import {remarkLatexEnvironment} from "../markdown";

export type FormulaOptionsForKatex = {
  texmath?: {
    engine?: any;
    // https://github.com/goessner/markdown-it-texmath#features
    delimiters?:
      | "dollars"
      | "brackets"
      | "doxygen"
      | "gitlab"
      | "julia"
      | "kramdown"
      | "beg_end";
    katexOptions?: KatexOptions;
  };
};

export const MarkdownForKatex: React.FC<MarkdownProps> = ({
  className,
  text,
}) => {
  const {
    formulaOptions,
    mdiOptions,
    htmlFilter,
  } = React.useContext(Context);
  return (<div className={className}>
    <ReactMarkdown
      remarkPlugins={[[remarkMath, {}], [remarkLatexEnvironment, {}],remarkGfm]}
      rehypePlugins={[[rehypeKatex, {}], rehypeRaw]}
    >
      {htmlFilter(replaceForKatex(text))}
    </ReactMarkdown>
  </div>);
};

const replaceForKatex = (text: string) => {
  return text
    .replace(/\\\\begin\{eqnarray\}/g, "\\begin{aligned}")
    .replace(/\\\\end\{eqnarray\}/g, "\\end{aligned}");
};
