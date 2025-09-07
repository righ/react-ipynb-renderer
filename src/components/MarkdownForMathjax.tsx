import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import type { Options as RemarkMathOptions } from 'remark-math';
import type { Options as MathJaxOptions } from 'rehype-mathjax';

import type { MarkdownProps } from '../types';
import { Context } from '../context';
import { remarkLatexEnvironment } from '../markdown';

export type MarkdownOptionsForMathjax = {
  remarkMathOptions?: RemarkMathOptions;
  mathjaxOptions?: MathJaxOptions;
};

export const MarkdownForMathjax: React.FC<MarkdownProps> = ({ className, text }) => {
  const { htmlFilter, markdownOptions } = React.useContext(Context);
  const [html, setHtml] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // for SSR
      void (async () => {
        try {
          const rehypePlugin = (await import('rehype-mathjax/svg')).default;
          const { remarkMathOptions = {}, mathjaxOptions = {} } = markdownOptions as MarkdownOptionsForMathjax;
          
          const processor = unified()
            .use(remarkParse as any)
            .use(remarkMath, remarkMathOptions)
            .use(remarkLatexEnvironment)
            .use(remarkGfm)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypePlugin, mathjaxOptions)
            .use(rehypeRaw)
            .use(rehypeStringify as any, { allowDangerousHtml: true });

          const result = await processor.process(htmlFilter(text));
          setHtml(String(result));
        } catch (error) {
          console.error('Error processing markdown:', error);
          setHtml(htmlFilter(text));
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
