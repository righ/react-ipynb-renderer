import React from "react";

import 'katex/dist/katex.min.css';
import MarkdownIt from 'markdown-it';
// @ts-ignore
import mdik from 'markdown-it-katex';

const mdi = new MarkdownIt();
mdi.use(mdik)

type Props = {
  text: string;
};

export const Markdown: React.FC<Props> = ({ text }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: mdi.render(text) }}></div>
  );
};
