import React from "react";
import { Prism } from "react-syntax-highlighter";
import * as PrismStyles from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Options as MarkdownItOptions } from "markdown-it";

import { CellType, SyntaxThemeType, LanguageType } from "../types";

type Props = {
  cell: CellType;
  syntaxTheme: SyntaxThemeType;
  language: LanguageType;
  bgTransparent: boolean;
  formulaOptions?: any;
  mdiOptions: MarkdownItOptions;
  Markdown: React.FC<{
    text: string;
    formulaOptions: any;
    mdiOptions: MarkdownItOptions;
  }>;
};

export const defaultFormulaRenderer = "katex";

export const Cell: React.FC<Props> = ({
  cell,
  syntaxTheme,
  language,
  bgTransparent = true,
  formulaOptions = {},
  mdiOptions,
  Markdown,
}) => {
  const prismStyle = PrismStyles[syntaxTheme];
  const styleOverridden = {
    'code[class*="language-"]': {
      ...prismStyle['code[class*="language-"]'],
      boxShadow: "none",
    },
    'pre[class*="language-"]': {
      ...prismStyle['pre[class*="language-"]'],
      border: "none",
      boxShadow: "none",
    },
  };
  if (bgTransparent) {
    styleOverridden['code[class*="language-"]'] = {
      ...styleOverridden['code[class*="language-"]'],
      background: "transparent",
    };
    styleOverridden['pre[class*="language-"]'] = {
      ...styleOverridden['pre[class*="language-"]'],
      background: "transparent",
    };
  }
  return (
    <div className="cell border-box-sizing code_cell rendered">
      <div className="input">
        <div className="prompt input_prompt">
          {cell.cell_type === "code" ? (
            <>
              In [
              {cell.execution_count || cell.prompt_number || cell.auto_number}]:
            </>
          ) : null}
        </div>
        <div className="inner_cell">
          {(() => {
            let source = "";
            if (cell.input) {
              source = cell.input.join("");
            } else if (cell.source) {
              source = cell.source.join("");
            }
            if (cell.cell_type === "markdown") {
              return (
                <div className="text_cell_render border-box-sizing rendered_html">
                  <Markdown
                    text={embedAttachments(source, cell.attachments)}
                    formulaOptions={formulaOptions}
                    mdiOptions={mdiOptions}
                  />
                </div>
              );
            }
            if (cell.cell_type === "code") {
              return (
                <div className="input_area">
                  <div className="highlight hl-ipython3">
                    {source && (
                      <Prism
                        language={language}
                        style={{ ...prismStyle, ...styleOverridden }}
                        customStyle={{
                          backgroundColor: "transparent",
                        }}
                      >
                        {source}
                      </Prism>
                    )}
                  </div>
                </div>
              );
            }
            if (cell.cell_type === "heading") {
              return <h2>{source}</h2>;
            }
          })()}
        </div>
      </div>
      {!cell.outputs?.length ? null : (
        <div className="output_wrapper">
          <div className="output">
            {(cell.outputs || []).map((output, j) => (
              <div className="output_area" key={j}>
                <div className="prompt output_prompt">
                  {output.execution_count && (
                    <>Out [{output.execution_count}]:</>
                  )}
                </div>
                {(() => {
                  if (output.data == null) {
                    if (output.png) {
                      return (
                        <div className="output_png output_subarea">
                          <img src={`data:image/png;base64,${output.png}`} />
                        </div>
                      );
                    }
                    if (output.jpeg) {
                      return (
                        <div className="output_jpeg output_subarea">
                          <img src={`data:image/jpeg;base64,${output.jpeg}`} />
                        </div>
                      );
                    }
                    if (output.gif) {
                      return (
                        <div className="output_gif output_subarea">
                          <img src={`data:image/gif;base64,${output.gif}`} />
                        </div>
                      );
                    }
                    if (output.text) {
                      return (
                        <div
                          className={"output_subarea output_stdout output_text"}
                        >
                          <pre>{output.text.join("")}</pre>
                        </div>
                      );
                    }
                    return null;
                  }
                  if (output.data["text/latex"]) {
                    return (
                      <div className="output_latex output_subarea output_execute_result">
                        <Markdown
                          text={output.data["text/latex"].join("")}
                          formulaOptions={formulaOptions}
                          mdiOptions={mdiOptions}
                        />
                      </div>
                    );
                  }
                  if (output.data["text/html"]) {
                    return (
                      <div
                        className="output_html rendered_html output_subarea"
                        dangerouslySetInnerHTML={{
                          __html: output.data["text/html"].join(""),
                        }}
                      ></div>
                    );
                  }
                  if (output.data["image/png"]) {
                    return (
                      <div className="output_png output_subarea">
                        <img
                          src={`data:image/png;base64,${output.data["image/png"]}`}
                        />
                      </div>
                    );
                  }
                  if (output.data["image/jpeg"]) {
                    return (
                      <div className="output_jpeg output_subarea">
                        <img
                          src={`data:image/jpeg;base64,${output.data["image/jpeg"]}`}
                        />
                      </div>
                    );
                  }
                  if (output.data["image/gif"]) {
                    return (
                      <div className="output_gif output_subarea">
                        <img
                          src={`data:image/gif;base64,${output.data["image/gif"]}`}
                        />
                      </div>
                    );
                  }
                  if (output.data["text/plain"]) {
                    return (
                      <div className="output_text output_subarea output_execute_result">
                        <pre>{output.data["text/plain"]}</pre>
                      </div>
                    );
                  }
                })()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const embedAttachments = (
  source: string,
  attachments: CellType["attachments"] = {}
) => {
  Object.entries(attachments).map(([name, mimes]) => {
    const mime = [...Object.keys(mimes)][0];
    if (mime == null) {
      return;
    }
    const data = `data:${mime};base64,${mimes[mime]}`;
    const re = new RegExp(`attachment:${name}`, "g");
    source = source.replace(re, data);
  });
  return source;
};
