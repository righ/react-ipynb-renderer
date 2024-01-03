import React, { Ref, forwardRef, memo } from "react";
import { Cell } from "./components/Cell";
import {
  MarkdownOptionsForMathjax,
  MarkdownForMathjax,
} from "./components/MarkdownForMathjax";
import { BaseProps, IpynbType } from "./types";
import pkg from "../package.json";
import { defaultHtmlFilter } from "./filters";
import { Context } from "./context";

console.debug(`react-ipynb-renderer@${pkg.version} is working.`);

export type Ipynb = IpynbType;

export type Props = BaseProps & {
  markdownOptions?: MarkdownOptionsForMathjax;
};

export type IpynbRef = Ref<HTMLDivElement>;

export const IpynbRenderer: React.FC<Props> = memo(
  forwardRef(
    (
      {
        ipynb,
        syntaxTheme = "xonokai",
        language = "python",
        bgTransparent = true,
        markdownOptions = {},
        htmlFilter = defaultHtmlFilter,
        seqAsExecutionCount = false,
      }: Props,
      ref: IpynbRef
    ) => {
      const cells = ipynb.cells || ipynb.worksheets?.[0]?.cells || [];
      return (
        <div
          ref={ref}
          className="react-ipynb-renderer-mathjax react-ipynb-renderer ipynb-renderer-root container"
        >
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
  )
);
