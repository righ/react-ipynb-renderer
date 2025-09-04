import path from "path";

const config = {
  stories: ["../.examples/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.css = {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    };
    
    // Add support for .ipynb files
    config.assetsInclude = ['**/*.ipynb'];
    
    // Fix Storybook React entry resolution
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = config.build.rollupOptions.external || [];
    
    // Add Storybook React to external dependencies
    if (Array.isArray(config.build.rollupOptions.external)) {
      config.build.rollupOptions.external.push(
        '@storybook/react',
        '@storybook/react/dist/entry-preview.mjs',
        '@storybook/react/dist/entry-preview-docs.mjs'
      );
    }
    
    // Alternative approach: optimizeDeps configuration
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
    config.optimizeDeps.exclude.push('@storybook/react');
    
    // Fix for development server - ensure proper resolution
    config.resolve = config.resolve || {};
    config.resolve.dedupe = config.resolve.dedupe || [];
    config.resolve.dedupe.push('@storybook/react');
    
    // Return the altered config
    return config;
  },
};

export default config;
