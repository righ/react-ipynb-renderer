import React from "react";

import { IpynbRenderer as IpynbRendererKatex } from "../src/index_katex";
import testfile from "./ipynb/test.json";

import "../src/styles/onedork.less";

export default {
  title: "Test",
};

export const katex = () => {
  return (
    <>
      <IpynbRendererKatex 
        ipynb={testfile} syntaxTheme="coy" />
    </>
  );
};
