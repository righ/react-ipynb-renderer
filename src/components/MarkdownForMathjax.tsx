import React, { useContext} from "react";
import ReactMarkdown from "react-markdown";
import { default as defaultRemarkMath, Options as RemarkMathOptions } from 'remark-math';
import rehypeMathJax from 'rehype-mathjax/svg';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Options as MathJaxOptions } from 'rehype-mathjax/lib/create-plugin';

import type { MarkdownProps } from "../types";
import { Context } from "../context";
import { remarkLatexEnvironment } from "../markdown";

export type MarkdownOptionsForMathjax = {
  remarkMath?: typeof defaultRemarkMath;
  remarkMathOptions?: RemarkMathOptions;
  mathjaxOptions?: MathJaxOptions;
};

export const MarkdownForMathjax: React.FC<MarkdownProps> = ({
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
    mathjaxOptions = {},
  } = markdownOptions as MarkdownOptionsForMathjax;

  return (<div className={className}>
    <ReactMarkdown
      remarkPlugins={[[remarkMath, remarkMathOptions], [remarkLatexEnvironment, {}], remarkGfm]}
      rehypePlugins={[[rehypeMathJax, mathjaxOptions], rehypeRaw]}
    >
      {htmlFilter(text)}
    </ReactMarkdown>
  </div>);
};
