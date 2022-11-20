import React from "react";
import { Cell } from "./components/Cell";
import {
  FormulaOptionsForKatex,
  MarkdownForKatex,
} from "./components/MarkdownForKatex";
import { BaseProps } from "./types";

import pkg from "../katex/package.json";
import { defaultHtmlFilter } from "./filters";
import { Context } from "./context";

console.debug(`react-ipynb-renderer-katex@${pkg.version} is working.`);

export type Props = BaseProps & {
  formulaOptions?: FormulaOptionsForKatex;
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
      <div className="react-ipynb-renderer-katex react-ipynb-renderer ipynb-renderer-root container">
        <Context.Provider
          value={{
            syntaxTheme,
            language,
            bgTransparent,
            mdiOptions,
            formulaOptions,
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
