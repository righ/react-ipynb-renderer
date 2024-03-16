import React from 'react';

import type { BaseProps, IpynbType } from './types';
import type { MarkdownOptionsForKatex } from './components/MarkdownForKatex';
import pkg from '../katex/package.json';
import { Cell } from './components/Cell';
import { MarkdownForKatex } from './components/MarkdownForKatex';
import { defaultHtmlFilter } from './filters';
import { Context } from './context';

console.debug(`react-ipynb-renderer-katex@${pkg.version} is working.`);

export type Ipynb = IpynbType;
export type Props = BaseProps & {
  markdownOptions?: MarkdownOptionsForKatex;
};

export const IpynbRenderer = React.memo(function ({
  ipynb,
  syntaxTheme = 'xonokai',
  language = 'python',
  bgTransparent = true,
  markdownOptions = {},
  htmlFilter = defaultHtmlFilter,
  seqAsExecutionCount = false,
  rootRef,
  onLoad = () => {},
}: Props) {
  React.useEffect(onLoad, []);
  const cells = ipynb.cells || ipynb.worksheets?.[0]?.cells || [];
  return (
    <div className="react-ipynb-renderer-katex react-ipynb-renderer ipynb-renderer-root container" ref={rootRef}>
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
});
