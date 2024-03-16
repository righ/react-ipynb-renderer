import React from "react";
import type { Options as RemarkMathOptions } from 'remark-math';
import { default as defaultRemarkMath } from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import type { KatexOptions } from "katex";

import type { MarkdownProps } from "../types";
import { Context } from "../context";
import { remarkLatexEnvironment } from "../markdown";
import type { PluggableList } from "react-markdown/lib";

export type MarkdownOptionsForKatex = {
  remarkMath?: typeof defaultRemarkMath;
  remarkMathOptions?: RemarkMathOptions;
  katexOptions?: KatexOptions;
};

const ReactMarkdown = React.lazy(() => import("react-markdown"));

export const MarkdownForKatex: React.FC<MarkdownProps> = ({
  className,
  text,
}) => {
  const {
    markdownOptions,
    htmlFilter,
  } = React.useContext(Context);
  const {
    remarkMath = defaultRemarkMath,
    remarkMathOptions = {},
    katexOptions = {},
  } = markdownOptions as MarkdownOptionsForKatex;

  const [rehypePlugins, setRehypePlugins] = React.useState<PluggableList>([rehypeRaw]);
  React.useEffect(() => {
    if (typeof window !== "undefined") { // for SSR
      (async () => {
        const rehypeKatex = await import('rehype-katex') as any;
        setRehypePlugins([[rehypeKatex.default, katexOptions], rehypeRaw]);
      })();
    }
  }, []);

  return (<div className={className}>
    <React.Suspense fallback={<></>}>
      <ReactMarkdown
        remarkPlugins={[[remarkMath, remarkMathOptions], [remarkLatexEnvironment, {}], remarkGfm]}
        rehypePlugins={rehypePlugins}
      >
        {htmlFilter(replaceForKatex(text))}
      </ReactMarkdown>
    </React.Suspense>
  </div>);
};

const replaceForKatex = (text: string) => {
  return text
    .replace(/\\\\begin\{eqnarray\}/g, "\\begin{aligned}")
    .replace(/\\\\end\{eqnarray\}/g, "\\end{aligned}");
};
