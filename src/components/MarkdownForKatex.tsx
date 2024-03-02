import React, { useContext} from "react";
import ReactMarkdown from "react-markdown";
import { default as defaultRemarkMath, Options as RemarkMathOptions } from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { KatexOptions } from "katex";

import { MarkdownProps } from "../types";
import { Context } from "../context";
import {remarkLatexEnvironment} from "../markdown";

export type MarkdownOptionsForKatex = {
  remarkMath?: typeof defaultRemarkMath;
  remarkMathOptions?: RemarkMathOptions;
  katexOptions?: KatexOptions;
};

export const MarkdownForKatex: React.FC<MarkdownProps> = ({
  className,
  text,
}) => {
  const {
    markdownOptions,
    htmlFilter,
  } = useContext(Context);
  const {
    remarkMath = defaultRemarkMath,
    remarkMathOptions = {},
    katexOptions = {},
  } = markdownOptions as MarkdownOptionsForKatex;

  return (<div className={className}>
    <ReactMarkdown
      remarkPlugins={[[remarkMath, remarkMathOptions], [remarkLatexEnvironment, {}], remarkGfm]}
      rehypePlugins={[[rehypeKatex, katexOptions], rehypeRaw]}
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
