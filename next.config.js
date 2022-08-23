const withAntdLess = require('next-plugin-antd-less');

module.exports = {
  ...withAntdLess({
    reactStrictMode: true,
    lessVarsFilePath: './styles/variables.less',
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {},
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    webpack(config) {
      return config;
    },
  }),
  publicRuntimeConfig: {},
};
