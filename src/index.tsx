import React from "react";

import type { MarkdownOptionsForMathjax } from "./components/MarkdownForMathjax";
import type {BaseProps, IpynbType} from "./types";
import pkg from "../package.json";
import { Cell } from "./components/Cell";
import { MarkdownForMathjax } from "./components/MarkdownForMathjax";
import { defaultHtmlFilter } from "./filters";
import { Context } from "./context";

console.debug(`react-ipynb-renderer@${pkg.version} is working.`);

export type Ipynb = IpynbType;

export type Props = BaseProps & {
  markdownOptions?: MarkdownOptionsForMathjax;
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
      <div className="react-ipynb-renderer-mathjax react-ipynb-renderer ipynb-renderer-root container">
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
);
