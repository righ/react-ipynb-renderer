import React from "react";

import { IpynbRenderer } from "../src/index";
import pca1 from "./ipynb/pca1.json";
import matrix from "./ipynb/matrix-3.json";

import "../src/styles/onedork.less";

export default {
  title: "onedork",
};

export const cb = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="cb" />
    </>
  );
};

export const coy = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="coy" />
    </>
  );
};

export const darcula = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="darcula" />
    </>
  );
};

export const dark = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="dark" />
    </>
  );
};

export const duotoneDark = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="duotoneDark" />
    </>
  );
};

export const duotoneEarth = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="duotoneEarth" />
    </>
  );
};

export const duotoneForest = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="duotoneForest" />
    </>
  );
};

export const duotoneLight = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="duotoneLight" />
    </>
  );
};

export const duotoneSea = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="duotoneSea" />
    </>
  );
};

export const duotoneSpace = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="duotoneSpace" />
    </>
  );
};

export const funky = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="funky" />
    </>
  );
};

export const ghcolors = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="ghcolors" />
    </>
  );
};

export const hopscotch = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="hopscotch" />
    </>
  );
};

export const okaidia = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="okaidia" />
    </>
  );
};

export const pojoaque = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="pojoaque" />
    </>
  );
};

export const prism = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="prism" />
    </>
  );
};

export const solarizedlight = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="solarizedlight" />
    </>
  );
};

export const tomorrow = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="tomorrow" />
    </>
  );
};

export const twilight = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="twilight" />
    </>
  );
};

export const vscDarkPlus = () => {
  return (
    <>
      <IpynbRenderer ipynb={pca1} syntaxTheme="vscDarkPlus" />
    </>
  );
};

export const xonokai = () => {
  return (
    <>
      <IpynbRenderer ipynb={matrix} syntaxTheme="xonokai" />
    </>
  );
};
