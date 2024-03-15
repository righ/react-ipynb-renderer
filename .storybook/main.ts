import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";


const config: StorybookConfig = {
  stories: ["../.examples/**/*.mdx", "../.examples/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-webpack5-compiler-babel"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module?.rules?.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.module?.rules?.push({
      test: /\.ipynb$/,
      use: ['json-loader'],
      include: path.resolve(__dirname, '../'),
    });
    // Return the altered config
    return config;
  },
};
export default config;
