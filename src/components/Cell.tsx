import React from "react";
import { Prism } from 'react-syntax-highlighter';
import * as PrismStyles from "react-syntax-highlighter/dist/cjs/styles/prism";

import { CellType, SyntaxThemeType, LanguageType } from "../types";
import { Markdown } from "./Markdown";

type Props = {
  cell: CellType;
  syntaxTheme: SyntaxThemeType;
  language: LanguageType;
  bgTransparent: boolean;
};

export const Cell: React.FC<Props> = ({ cell, syntaxTheme, language, bgTransparent = true }) => {
  const prismStyle = PrismStyles[syntaxTheme];
  const styleOverridden = {
    "code[class*=\"language-\"]": { ...prismStyle["code[class*=\"language-\"]"], boxShadow: "none" },
    "pre[class*=\"language-\"]": { ...prismStyle["pre[class*=\"language-\"]"], border: "none", boxShadow: "none" },
  };
  if (bgTransparent) {
    styleOverridden["code[class*=\"language-\"]"] = { ...styleOverridden["code[class*=\"language-\"]"], background: "transparent" };
    styleOverridden["pre[class*=\"language-\"]"] = { ...styleOverridden["pre[class*=\"language-\"]"], background: "transparent" };
  }
  return <div className="cell border-box-sizing code_cell rendered">
    <div className="input">
      <div className="prompt input_prompt">
        {cell.cell_type === "code" ? <>In [{cell.execution_count}]:</> : null}
      </div>
      <div className="inner_cell">
        {
          (() => {
            if (!cell.source) {
              return null;
            }
            let source = cell.source.join("");
            if (cell.cell_type === "markdown") {
              return (<div
                className="text_cell_render border-box-sizing rendered_html"
              >
                <Markdown text={replaceForKatex(source)} />
              </div>)
            }
            if (cell.cell_type === "code") {
              return (<div className="input_area">
                <div className="highlight hl-ipython3">
                  {cell.source && <Prism language={language} style={{ ...prismStyle, ...styleOverridden }} customeStyle={{
                    backgroundColor: "transparent",
                  }}>
                    {source}
                  </Prism>}
                </div>
              </div>);
            }
          })()
        }

      </div>
    </div>
    {
      !cell.outputs?.length ? null : <div className="output_wrapper">
        <div className="output">
          {
            cell.outputs.map((output, j) => (
              <div className="output_area" key={j}>
                <div className="prompt output_prompt">{output.execution_count && <>Out [{output.execution_count}]:</>}</div>
                {
                  (() => {
                    if (!output.data) {
                      return null;
                    }
                    if (output.data["text/latex"]) {
                      return (<div className="output_latex output_subarea output_execute_result">
                        <Markdown text={replaceForKatex(output.data["text/latex"].join(""))} />
                      </div>)
                    }
                    if (output.data["text/html"]) {
                      return (<div
                        className="output_html rendered_html output_subarea"
                        dangerouslySetInnerHTML={{
                          __html: output.data["text/html"].join(""),
                        }}
                      >
                      </div>)
                    }
                    if (output.data["image/png"]) {
                      return (<div
                        className="output_png output_subarea"
                      >
                        <img src={`data:image/png;base64,${output.data["image/png"]}`} />
                      </div>)
                    }
                    if (output.data["text/plain"]) {
                      return (<div className="output_text output_subarea output_execute_result">
                        <pre>{output.data["text/plain"]}</pre>
                      </div>)
                    }
                  })()
                }
              </div>
            ))
          }
        </div>
      </div>
    }
  </div >
};

const replaceForKatex = (text: string) => {
  return text
    .replace("\\begin{eqnarray}", "\\begin{aligned}")
    .replace("\\end{eqnarray}", "\\end{aligned}");
};
