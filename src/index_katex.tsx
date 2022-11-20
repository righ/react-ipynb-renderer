import React from "react";
import { Cell } from "./components/Cell";
import {
  FormulaOptionsForKatex,
  MarkdownForKatex,
} from "./components/MarkdownForKatex";
import { BaseProps } from "./types";

import pkg from "../katex/package.json";

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
    htmlFilter = (html: string) => html,
    htmlFilterForMarkdown = (html: string) => html,
    htmlFilterForLatex = (html: string) => html,
  }) => {
    const cells = ipynb.cells || ipynb.worksheets?.[0]?.cells || [];
    return (
      <div className="react-ipynb-renderer-katex react-ipynb-renderer ipynb-renderer-root container">
        {cells.map((cell, i) => {
          cell.auto_number = i + 1;
          return (
            <Cell
              key={i}
              cell={cell}
              syntaxTheme={syntaxTheme}
              language={language}
              bgTransparent={bgTransparent}
              formulaOptions={formulaOptions}
              mdiOptions={mdiOptions}
              htmlFilter={htmlFilter}
              htmlFilterForMarkdown={htmlFilterForMarkdown}
              htmlFilterForLatex={htmlFilterForLatex}
              Markdown={MarkdownForKatex}
            />
          );
        })}
      </div>
    );
  }
);
