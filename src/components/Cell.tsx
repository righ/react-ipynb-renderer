import React from "react";
import { Prism } from 'react-syntax-highlighter';
import * as PrismStyles from "react-syntax-highlighter/dist/cjs/styles/prism";

import { CellType, SyntaxThemeType, LanguageType, FormulaOptions } from "../types";
import { Markdown } from "./Markdown";

import { MathJax, MathJaxContext } from "better-react-mathjax";
import { MarkdownForKatex } from "./MarkdownForKatex";

type Props = {
  cell: CellType;
  syntaxTheme: SyntaxThemeType;
  language: LanguageType;
  bgTransparent: boolean;
  formulaOptions?: FormulaOptions;
};

export const defaultFormulaRenderer = "katex";
const inlineMath = [['$', '$'], ['\\(', '\\)']];

export const Cell: React.FC<Props> = ({ cell, syntaxTheme, language, bgTransparent = true, formulaOptions = {} }) => {
  const { renderer = defaultFormulaRenderer } = formulaOptions;
  if (typeof formulaOptions.mathjaxContextProps === "undefined") {
    formulaOptions.mathjaxContextProps = {}
  }
  if (typeof formulaOptions.mathjaxContextProps.config === "undefined") {
    formulaOptions.mathjaxContextProps.config = {};
  }
  if (renderer === "mathjax") {
    if (formulaOptions.mathjaxContextProps.version === 2) {
      // for mathjax v2
      if (typeof formulaOptions.mathjaxContextProps.config.tex2jax === "undefined") {
        formulaOptions.mathjaxContextProps.config.tex2jax = {};
      }
      if (typeof formulaOptions.mathjaxContextProps.config.tex2jax.inlineMath === "undefined") {
        formulaOptions.mathjaxContextProps.config.tex2jax.inlineMath = inlineMath;
      }
    } else {
      // for mathjax v3
      // @ts-ignore
      if (typeof formulaOptions.mathjaxContextProps.config.tex === "undefined") {
        // @ts-ignore
        formulaOptions.mathjaxContextProps.config.tex = {};
      }
      // @ts-ignore
      if (typeof formulaOptions.mathjaxContextProps.config.tex.inlineMath === "undefined") {
        // @ts-ignore
        formulaOptions.mathjaxContextProps.config.tex.inlineMath = inlineMath;
      }
    }
  }
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
        {cell.cell_type === "code" ? <>In [{cell.execution_count || cell.prompt_number}]:</> : null}
      </div>
      <div className="inner_cell">
        {
          (() => {
            let source = "";
            if (cell.input) {
              source = cell.input.join("");
            } else if (cell.source) {
              source = cell.source.join("");
            }
            if (cell.cell_type === "markdown") {
              return (<div
                className="text_cell_render border-box-sizing rendered_html"
              >
                <Markdown text={source} formulaOptions={formulaOptions} />
              </div>)
            }
            if (cell.cell_type === "code") {
              return (<div className="input_area">
                <div className="highlight hl-ipython3">
                  {source && <Prism language={language} style={{ ...prismStyle, ...styleOverridden }} customeStyle={{
                    backgroundColor: "transparent",
                  }}>
                    {source}
                  </Prism>}
                </div>
              </div>);
            }
            if (cell.cell_type === "heading") {
              return (<h2>{source}</h2>);
            }
          })()
        }
      </div>
    </div>
    {
      !cell.outputs?.length ? null : <div className="output_wrapper">
        <div className="output">
          {
            (cell.outputs || []).map((output, j) => (
              <div className="output_area" key={j}>
                <div className="prompt output_prompt">{output.execution_count && <>Out [{output.execution_count}]:</>}</div>
                {
                  (() => {
                    if (output.data == null) {
                      if (output.png) {
                        return (<div
                          className="output_png output_subarea"
                        >
                          <img src={`data:image/png;base64,${output.png}`} />
                        </div>);
                      }
                      if (output.jpeg) {
                        return (<div
                          className="output_jpeg output_subarea"
                        >
                          <img src={`data:image/jpeg;base64,${output.jpeg}`} />
                        </div>);
                      }
                      if (output.gif) {
                        return (<div
                          className="output_gif output_subarea"
                        >
                          <img src={`data:image/gif;base64,${output.gif}`} />
                        </div>);
                      }
                      if (output.text) {
                        return (<div className={"output_subarea output_stdout output_text"}>
                          <pre>{output.text.join("")}</pre>
                        </div>);
                      }
                      return null;
                    }
                    if (output.data["text/latex"]) {
                      return (<div className="output_latex output_subarea output_execute_result">
                        {
                          renderer !== "mathjax" ? null : (<MathJaxContext {...formulaOptions.mathjaxContextProps}>
                            <MathJax {...formulaOptions.mathjaxProps}>{output.data["text/latex"].join("")}</MathJax>
                          </MathJaxContext>)
                        }
                        {
                          renderer !== "katex" ? null :
                            (<MarkdownForKatex
                              text={output.data["text/latex"].join("")}
                              formulaOptions={formulaOptions}
                            />)
                        }
                      </div>);
                    }
                    if (output.data["text/html"]) {
                      return (<div
                        className="output_html rendered_html output_subarea"
                        dangerouslySetInnerHTML={{
                          __html: output.data["text/html"].join(""),
                        }}
                      >
                      </div>);
                    }
                    if (output.data["image/png"]) {
                      return (<div
                        className="output_png output_subarea"
                      >
                        <img src={`data:image/png;base64,${output.data["image/png"]}`} />
                      </div>);
                    }
                    if (output.data["image/jpeg"]) {
                      return (<div
                        className="output_jpeg output_subarea"
                      >
                        <img src={`data:image/jpeg;base64,${output.data["image/jpeg"]}`} />
                      </div>);
                    }
                    if (output.data["image/gif"]) {
                      return (<div
                        className="output_gif output_subarea"
                      >
                        <img src={`data:image/gif;base64,${output.data["image/gif"]}`} />
                      </div>);
                    }
                    if (output.data["text/plain"]) {
                      return (<div className="output_text output_subarea output_execute_result">
                        <pre>{output.data["text/plain"]}</pre>
                      </div>);
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


