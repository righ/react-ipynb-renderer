import React from "react";

import { IpynbRenderer as IpynbRendererMathjax } from "../src/index";
import { IpynbRenderer as IpynbRendererKatex } from "../src/index_katex";
import testfile from "./ipynb/test.ipynb";

import "../src/styles/onedork.less";

export default {
  title: "Test",
};

export const mathjax = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <IpynbRendererMathjax
        rootRef={ref}
        onLoad={() => {
          console.log("loaded cb chesterish", ref);
        }}
        ipynb={testfile}
        syntaxTheme="cb"
        // htmlFilter={(html) => "filtered"}
      />
    </>
  );
};

export const katex = () => {
  return (
    <>
      <IpynbRendererKatex 
        ipynb={testfile} syntaxTheme="coy" />
    </>
  );
};
