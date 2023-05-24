const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links', '@storybook/addon-storysource', '@storybook/addon-a11y', "@storybook/preset-ant-design"],
  // features: {
  //   interactionsDebugger: true, // 👈 Enable playback controls
  // },
  // "framework": "@storybook/react",
  // "core": {
  //   "builder": "@storybook/builder-webpack5"
  // },
  babel: async (options) => {
    console.log(options);
    return {
      // Update your babel configuration here
      ...options,
    }
  },
  // babel: async (options) => {
  //   const { plugins = [] } = options
  //   return {
  //     ...options,
  //     plugins: [
  //       ...plugins,
  //       [
  //         require.resolve('@babel/plugin-proposal-private-property-in-object'),
  //         { loose: true },
  //       ],
  //     ]
  //   }
  // },
  // babel: async (options) => ({
  //   ...options,
  //   plugins: [
  //     ...options.plugins,
  //     // '@babel/plugin-proposal-nullish-coalescing-operator',
  //     // '@babel/plugin-proposal-optional-chaining',
  //     [require.resolve("@babel/plugin-proposal-private-methods"), { "loose": true }],
  //   ],
  // }),
  webpackFinal: async config => {
    // TODO: this is not working
    config.module.rules.push({
      test: /\.js$/,
      // exclude: /node_modules/,
      // exclude: /(node_modules|bower_components|build)/,
      loader: require.resolve('babel-loader'),
      options: {
        // presets: [['react-app', { flow: false, typescript: true }], ['@babel/preset-env']],
        presets: [[require.resolve('@babel/preset-env')]],
        // plugins: [
        //   '@babel/plugin-proposal-nullish-coalescing-operator',
        //   '@babel/plugin-proposal-optional-chaining',
        //   ["@babel/plugin-proposal-private-methods", { "loose": true }],
        // ]
      },
    });

    config.module.rules.push({
      test: /\.ts$|tsx/,
      // loader: ["babel-loader", "ts-loader"],
      loader: require.resolve('babel-loader'),
      // add multiple loaders


      options: {
        presets: [[require.resolve('@babel/preset-env')], ['react-app', { flow: false, typescript: true }]],
        plugins: [
          // '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
          // ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ],

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
              'ant-theme-file': "; @import '" + path.resolve(__dirname, '../src/styles/antd-variables.less') + "'",
            },
            javascriptEnabled: true,
          }
        }
      }],
      include: path.resolve(__dirname, '../'),
    });

    // config.resolve.plugins = [
    //   '@babel/plugin-proposal-nullish-coalescing-operator',
    //   '@babel/plugin-proposal-optional-chaining'
    // ];

    config.resolve.extensions.push('.ts', '.tsx');
    config.node = Object.assign({}, config.node, {
      fs: 'empty',
    });

    return config;
  },
};
