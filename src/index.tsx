import React, { forwardRef, Ref } from 'react';

import type { BaseProps, IpynbType } from './types';
import type { MarkdownOptionsForMathjax } from './components/MarkdownForMathjax';
import { Cell } from './components/Cell';
import { MarkdownForMathjax } from './components/MarkdownForMathjax';
import { defaultHtmlFilter } from './filters';
import { Context } from './context';

export type Ipynb = IpynbType;
export type Props = BaseProps & {
  markdownOptions?: MarkdownOptionsForMathjax;
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
    <div className="react-ipynb-renderer-mathjax react-ipynb-renderer ipynb-renderer-root container" ref={ref}>
      <Context.Provider
        value={{
          syntaxTheme,
          language,
          bgTransparent,
          markdownOptions,
          seqAsExecutionCount,
          htmlFilter,
          Markdown: MarkdownForMathjax,
        }}
      >
        {cells.map((cell, i) => {
          return <Cell key={i} cell={cell} seq={i + 1} />;
        })}
      </Context.Provider>
    </div>
  );
}

export const IpynbRenderer = React.memo(forwardRef<HTMLDivElement, Props>(Component));
