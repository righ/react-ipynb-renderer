import React from "react";

import { IpynbRenderer as IpynbRendererKatex } from "../src/index_katex";
import testfile from "./ipynb/test.ipynb";

import "../src/styles/onedork.less";

export default {
  title: "Test",
};

import "katex/dist/katex.min.css";

export const katex = () => {
  return (
    <>
      <IpynbRendererKatex 
        ipynb={testfile} syntaxTheme="coy" />
    </>
  );
};
