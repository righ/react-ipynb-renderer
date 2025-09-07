import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import type { KatexOptions } from 'katex';
// Import KaTeX CSS
import 'katex/dist/katex.min.css';
import type { Options as RemarkMathOptions } from 'remark-math';

import type { MarkdownProps } from '../types';
import { Context } from '../context';
import { remarkLatexEnvironment } from '../markdown';

export type MarkdownOptionsForKatex = {
  remarkMathOptions?: RemarkMathOptions;
  katexOptions?: KatexOptions;
};

export const MarkdownForKatex: React.FC<MarkdownProps> = ({ className, text }) => {
  const { htmlFilter, markdownOptions } = React.useContext(Context);
  const [html, setHtml] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // for SSR
      void (async () => {
        try {
          const rehypePlugin = (await import('rehype-katex')).default;
          const { remarkMathOptions = {}, katexOptions = {} } = markdownOptions as MarkdownOptionsForKatex;
          
          const processor = unified()
            .use(remarkParse as any)
            .use(remarkMath, remarkMathOptions)
            .use(remarkLatexEnvironment)
            .use(remarkGfm)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypePlugin as any, katexOptions)
            .use(rehypeRaw)
            .use(rehypeStringify as any, { allowDangerousHtml: true });

          const processedText = replaceForKatex(text);
          const result = await processor.process(htmlFilter(processedText));
          setHtml(String(result));
        } catch (error) {
          console.error('Error processing markdown:', error);
          const processedText = replaceForKatex(text);
          setHtml(htmlFilter(processedText));
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  }, [text, htmlFilter, markdownOptions]);

  if (isLoading) {
    return <div className={className}></div>;
  }

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const replaceForKatex = (text: string) => {
  return text.replace(/\\\\begin\{eqnarray\}/g, '\\begin{aligned}').replace(/\\\\end\{eqnarray\}/g, '\\end{aligned}');
};
