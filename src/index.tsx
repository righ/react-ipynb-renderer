import React from "react";
import { Cell } from "./components/Cell";
import {
  FormulaOptionsForMathjax,
  MarkdownForMathjax,
} from "./components/MarkdownForMathjax";
import { BaseProps, HtmlFilter } from "./types";
import pkg from "../package.json";
import { defaultHtmlFilter } from "./filters";
import { Context } from "./context";

console.debug(`react-ipynb-renderer@${pkg.version} is working.`);

export type Props = BaseProps & {
  formulaOptions?: FormulaOptionsForMathjax;
};

export const IpynbRenderer: React.FC<Props> = React.memo(
  ({
    ipynb,
    syntaxTheme = "xonokai",
    language = "python",
    bgTransparent = true,
    formulaOptions = {},
    mdiOptions = {},
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
            mdiOptions,
            formulaOptions,
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
