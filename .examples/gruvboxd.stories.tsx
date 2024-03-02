
import type { Meta, StoryObj } from "@storybook/react";

import { IpynbRenderer } from "../src/index";
import type { Ipynb } from "../src/index";
import pca1 from "./ipynb/pca1.json";

import "../src/styles/gruvboxd.less";

const meta: Meta<typeof IpynbRenderer> = {
  title: "gruvboxd",
  component: IpynbRenderer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    ipynb: { control: "object" },
    syntaxTheme: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof IpynbRenderer>;

export const cb: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "cb",
  },
};


export const coy: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "coy",
  },
};

export const darcula: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "darcula",
  },
};

export const dark: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "dark",
  },
};

export const duotoneDark: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "duotoneDark",
  },
};

export const duotoneEarth: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "duotoneEarth",
  },
};

export const duotoneForest: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "duotoneForest",
  },
};

export const duotoneLight: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "duotoneLight",
  },
}; 

export const duotoneSea: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "duotoneSea",
  },
};

export const duotoneSpace: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "duotoneSpace",
  },
};

export const funky: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "funky",
  },
};

export const ghcolors: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "ghcolors",
  },
};

export const hopscotch: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "hopscotch",
  },
};

export const okaidia: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "okaidia",
  },
};

export const pojoaque: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "pojoaque",
  },
};

export const prism: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "prism",
  },
};

export const solarizedlight: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "solarizedlight",
  },
};

export const tomorrow: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "tomorrow",
  },
};

export const twilight: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "twilight",
  },
};

export const vscDarkPlus: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "vscDarkPlus",
  },
};

export const xonokai: Story = {
  args: {
    ipynb: pca1 as Ipynb,
    syntaxTheme: "xonokai",
  },
};

