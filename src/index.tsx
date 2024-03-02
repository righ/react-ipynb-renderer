import React from "react";
import { Cell } from "./components/Cell";
import {
  MarkdownOptionsForMathjax,
  MarkdownForMathjax,
} from "./components/MarkdownForMathjax";
import {BaseProps, IpynbType} from "./types";
import {version} from "./version";
import { defaultHtmlFilter } from "./filters";
import { Context } from "./context";

console.debug(`react-ipynb-renderer@${version} is working.`);

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
