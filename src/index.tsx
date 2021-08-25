import React from "react";
import { Cell } from "./components/Cell";
import { Props } from "./types";

export const IpynbRenderer: React.FC<Props> = React.memo(({
  ipynb,
  syntaxTheme = "xonokai",
  language = "python",
  bgTransparent = true,
}) => {
  const cells = ipynb.cells || (ipynb.worksheets && ipynb.worksheets[0].cells) || [];
  return (<div className="container ipynb-renderer-root">
    {
      cells.map((cell, i) => <Cell
        key={i}
        cell={cell}
        syntaxTheme={syntaxTheme}
        language={language}
        bgTransparent={bgTransparent}
      />)
    }
  </div>);
});
