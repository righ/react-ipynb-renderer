
import type { Meta, StoryObj } from "@storybook/react";

import { IpynbRenderer } from "../src/index";
import pca1 from "./pca1.json";


import "../src/styles/chesterish.less";


const meta: Meta<typeof IpynbRenderer> = {
  title: "chesterish",
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
    ipynb: pca1,
    syntaxTheme: "cb",
  },
};


