module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links', '@storybook/addon-storysource', '@storybook/addon-a11y', "@storybook/preset-ant-design"],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.node = Object.assign({}, config.node, {
      fs: 'empty',
    });
    return config;
  },
};
