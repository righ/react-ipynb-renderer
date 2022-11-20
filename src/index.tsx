import React from "react";
import * as DOMPurify from "dompurify";
import { Cell } from "./components/Cell";
import {
  FormulaOptionsForMathjax,
  MarkdownForMathjax,
} from "./components/MarkdownForMathjax";
import {BaseProps, HtmlFilter} from "./types";
import pkg from "../package.json";
import {defaultHtmlFilter} from "./filters";

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
    htmlFilterForMarkdown = defaultHtmlFilter,
    htmlFilterForLatex = defaultHtmlFilter,
  }) => {
    const cells = ipynb.cells || ipynb.worksheets?.[0]?.cells || [];
    return (
      <div className="react-ipynb-renderer-mathjax react-ipynb-renderer ipynb-renderer-root container">
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
              Markdown={MarkdownForMathjax}
            />
          );
        })}
      </div>
    );
  }
);
