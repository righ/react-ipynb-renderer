import React from "react";
import type { Options as RemarkMathOptions } from 'remark-math';
import { default as defaultRemarkMath } from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Options as MathJaxOptions } from 'rehype-mathjax/lib/create-plugin';

import type { MarkdownProps } from "../types";
import { Context } from "../context";
import { remarkLatexEnvironment } from "../markdown";
import type { PluggableList } from "react-markdown/lib";

export type MarkdownOptionsForMathjax = {
  remarkMath?: typeof defaultRemarkMath;
  remarkMathOptions?: RemarkMathOptions;
  mathjaxOptions?: MathJaxOptions;
};

const ReactMarkdown = React.lazy(() => import("react-markdown"));

export const MarkdownForMathjax: React.FC<MarkdownProps> = ({
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
    mathjaxOptions = {},
  } = markdownOptions as MarkdownOptionsForMathjax;

  const [rehypePlugins, setRehypePlugins] = React.useState<PluggableList>([rehypeRaw]);
  React.useEffect(() => {
    if (typeof window !== "undefined") { // for SSR
      (async () => {
        // @ts-expect-error
        const rehypeMathjax = await import('rehype-mathjax');
        setRehypePlugins([[rehypeMathjax.default, mathjaxOptions], rehypeRaw]);
      })();
    }
  }, []);

  return (<div className={className}>
    <React.Suspense fallback={<></>}>
      <ReactMarkdown
        remarkPlugins={[[remarkMath, remarkMathOptions], [remarkLatexEnvironment, {}], remarkGfm]}
        rehypePlugins={rehypePlugins}
      >
        {htmlFilter(text)}
      </ReactMarkdown>
    </React.Suspense>
  </div>);
};
