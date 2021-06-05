import React from "react";
import { Cell } from "./components/Cell";
import { CellType, SyntaxThemeType, LanguageType } from "./types";

type Props = {
  ipynb: { cells: CellType[] };
  syntaxTheme?: SyntaxThemeType;
  language?: LanguageType;
  codeTransparent?: boolean;
}

export const IpynbRenderer: React.FC<Props> = React.memo(({
  ipynb,
  syntaxTheme = "xonokai",
  language = "python",
  codeTransparent = true,
}) => {

  return (<div className="container ipynb-renderer-root">
    {
      ipynb.cells.map((cell, i) => <Cell
        key={i}
        cell={cell}
        syntaxTheme={syntaxTheme}
        language={language}
        codeTransparent={codeTransparent}
      />)
    }
  </div>);
});
