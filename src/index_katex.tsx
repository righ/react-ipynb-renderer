import React from "react";
import { Cell } from "./components/Cell";
import {
  MarkdownOptionsForKatex,
  MarkdownForKatex,
} from "./components/MarkdownForKatex";
import { BaseProps } from "./types";

import {version} from "./version";
import { defaultHtmlFilter } from "./filters";
import { Context } from "./context";

console.debug(`react-ipynb-renderer-katex@${version} is working.`);

export type Props = BaseProps & {
  markdownOptions?: MarkdownOptionsForKatex;
};

export const IpynbRenderer: React.FC<Props> = React.memo(
  ({
    ipynb,
    syntaxTheme = "xonokai",
    language = "python",
    bgTransparent = true,
    markdownOptions = {},
    htmlFilter = defaultHtmlFilter,
    seqAsExecutionCount = false,
  }) => {
    const cells = ipynb.cells || ipynb.worksheets?.[0]?.cells || [];
    return (
      <div className="react-ipynb-renderer-katex react-ipynb-renderer ipynb-renderer-root container">
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
);
