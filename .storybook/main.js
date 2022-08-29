const path = require('path')

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

    config.module.rules = config.module.rules.filter(
      f => f.test.toString() !== '/\\.less$/'
    );

    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', {
        loader: 'less-loader', options: {
          lessOptions: {
            modifyVars: {
              'primary-color': 'green',
              'font-size-base': '18px',
              'font-family': '"manrope__regular", sans-serif',
            },
            javascriptEnabled: true,
          }
        }
      }],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.extensions.push('.ts', '.tsx');
    config.node = Object.assign({}, config.node, {
      fs: 'empty',
    });

    return config;
  },
};
