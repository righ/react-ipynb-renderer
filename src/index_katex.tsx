import React, { forwardRef, Ref } from 'react';

import type { BaseProps, IpynbType } from './types';
import type { MarkdownOptionsForKatex } from './components/MarkdownForKatex';
import { Cell } from './components/Cell';
import { MarkdownForKatex } from './components/MarkdownForKatex';
import { defaultHtmlFilter } from './filters';
import { Context } from './context';

// Export only Katex-specific Markdown component
export { MarkdownForKatex as Markdown } from './components/MarkdownForKatex';
export type { MarkdownOptionsForKatex } from './components/MarkdownForKatex';

export type Ipynb = IpynbType;
export type Props = BaseProps & {
  markdownOptions?: MarkdownOptionsForKatex;
};

function Component({
  ipynb,
  syntaxTheme = 'xonokai',
  language = 'python',
  bgTransparent = true,
  markdownOptions = {},
  htmlFilter = defaultHtmlFilter,
  seqAsExecutionCount = false,
  onLoad = () => {},
}: Props, ref: Ref<HTMLDivElement>) {
  React.useEffect(onLoad, []);
  const cells = ipynb.cells || ipynb.worksheets?.[0]?.cells || [];
  return (
    <div className="react-ipynb-renderer-katex react-ipynb-renderer ipynb-renderer-root container" ref={ref}>
      <Context.Provider
        value={{
          syntaxTheme,
          language,
          bgTransparent,
          markdownOptions,
          seqAsExecutionCount,
          htmlFilter,
          Markdown: MarkdownForKatex,
        }}
      >
        {cells.map((cell, i) => {
          cell.auto_number = i + 1;
          return <Cell key={i} cell={cell} seq={i + 1} />;
        })}
      </Context.Provider>
    </div>
  );
}

export const IpynbRenderer = React.memo(forwardRef<HTMLDivElement, Props>(Component));
