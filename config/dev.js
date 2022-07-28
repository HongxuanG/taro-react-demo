const path = require('path')
module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  alias: {
    "@": path.resolve(__dirname, "..", "src"),
  },
  h5: {},
  sass: {
    resource: path.resolve(__dirname, "..", "src/styles/common.scss"),
  },
};
